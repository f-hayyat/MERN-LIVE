import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "../products/ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchProductById,
	fetchSimilarProducts,
} from "../../redux/slices/productSlice";
import { addProductToCart, fetchCart } from "../../redux/slices/cartSlice"; // Assuming you have this

const ProductDetails = ({ productId }) => {
	const { id } = useParams();
	const dispatch = useDispatch();

	const { selectedProduct, similarProducts, loading, error } = useSelector(
		(state) => state.products
	);
	const { user, guestId } = useSelector((state) => state.auth);

	const [selectedSize, setSelectedSize] = useState("");
	const [selectedColor, setSelectedColor] = useState("");
	const [quantity, setQuantity] = useState(1);
	const [selectedImageIndex, setSelectedImageIndex] = useState(0);

	const fetchProductId = productId || id;

	useEffect(() => {
		if (fetchProductId) {
			dispatch(fetchProductById(fetchProductId));
			dispatch(fetchSimilarProducts(fetchProductId));
		}
	}, [dispatch, fetchProductId]);

	// In ProductDetails.js - Update handleAddToCart
	const handleAddToCart = async () => {
		if (!selectedColor) {
			toast.error("Please select a color for your order!");
			return;
		}

		if (!selectedSize) {
			toast.error("Please select a size for your order!");
			return;
		}

		if (quantity < 1) {
			toast.error("Quantity must be at least 1");
			return;
		}

		try {
			await dispatch(
				addProductToCart({
					productId: fetchProductId,
					quantity,
					color: selectedColor,
					size: selectedSize,
					guestId,
					userId: user ? user._id : null,
				})
			).unwrap();

			// Refresh the cart after successful addition
			await dispatch(
				fetchCart({
					userId: user ? user._id : null,
					guestId,
				})
			).unwrap();

			toast.success("Product added to cart successfully!");
		} catch (err) {
			console.error(err);
			toast.error("Failed to add product to cart.");
		}
	};
	if (loading || !selectedProduct) {
		return <div className="text-center py-10">Loading product...</div>;
	}

	if (error) {
		return <div className="text-center text-red-500 py-10">{error}</div>;
	}

	const product = selectedProduct;

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex flex-col md:flex-row gap-6">
				{/* Thumbnail Images */}
				<div className="flex flex-col md:flex-row md:w-1/2 lg:justify-center gap-4 lg:ml-7">
					<div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-hidden">
						{product.images?.map((img, index) => (
							<img
								key={index}
								src={img.url}
								alt={`${product.name} ${index}`}
								className={`w-20 h-20 object-cover cursor-pointer rounded-lg ${
									selectedImageIndex === index ? "border-2 border-blue-500" : ""
								}`}
								onClick={() => setSelectedImageIndex(index)}
							/>
						))}
					</div>
					{/* Main Image */}
					<div className="flex-grow">
						<img
							src={product.images[selectedImageIndex].url}
							alt={product.name}
							className="w-[400px] h-auto object-cover rounded-lg mx-auto"
						/>
					</div>
				</div>

				{/* Product Details */}
				<div className="md:w-2/5 flex flex-col justify-center items-start">
					<h1 className="text-3xl font-semibold text-gray-800 mb-4">
						{product.name}
					</h1>
					<div className="mb-4">
						<span className="line-through text-gray-500 mr-2">
							${product.price}
						</span>
						<span className="text-xl font-semibold text-black">
							${product.discountPrice}
						</span>
					</div>
					<p className="text-gray-600 mb-6">{product.description}</p>

					{/* Colors */}
					<div className="mb-6">
						<h3 className="font-semibold mb-2">Colors:</h3>
						<div className="flex gap-2">
							{product.colors?.map((color) => (
								<div
									key={color}
									className={`w-8 h-8 rounded-full cursor-pointer ${
										selectedColor === color
											? " outline-2 outline-offset-3 outline-black"
											: ""
									}`}
									style={{ backgroundColor: color }}
									onClick={() => setSelectedColor(color)}
								></div>
							))}
						</div>
					</div>

					{/* Sizes */}
					<div className="mb-6">
						<h3 className="font-semibold mb-2">Sizes:</h3>
						<div className="flex gap-4">
							{product.sizes?.map((size) => (
								<button
									key={size}
									className={`w-10 h-10 border-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out ${
										selectedSize === size
											? "bg-black text-white border-transparent"
											: "border-gray-400 hover:border-gray-800 hover:bg-gray-100"
									}`}
									onClick={() => setSelectedSize(size)}
								>
									{size}
								</button>
							))}
						</div>
					</div>

					{/* Quantity */}
					<div className="flex items-center gap-4 mb-6">
						<span className="font-semibold">Quantity:</span>
						<button
							className="px-3 py-1 border-gray-300 border-2 rounded-lg hover:bg-gray-200 hover:border-gray-900 transition-all duration-300"
							onClick={() => setQuantity(Math.max(1, quantity - 1))}
						>
							-
						</button>
						<span className="w-8 text-center">{quantity}</span>
						<button
							className="px-3 py-1 border-gray-300 border-2 rounded-lg hover:bg-gray-200 hover:border-gray-900 transition-all duration-300"
							onClick={() => setQuantity(quantity + 1)}
						>
							+
						</button>
					</div>

					{/* Add to Cart */}
					<button
						onClick={handleAddToCart}
						className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-black transition duration-200"
					>
						Add to Cart
					</button>

					{/* Product Meta */}
					<table className="w-full mt-6">
						<tbody>
							<tr className="border-b border-gray-200">
								<td className="py-2 px-4 font-semibold">Brand:</td>
								<td className="py-2 px-4 text-gray-600">{product.brand}</td>
							</tr>
							<tr className="border-b border-gray-200">
								<td className="py-2 px-4 font-semibold">Material:</td>
								<td className="py-2 px-4 text-gray-600">{product.material}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			{/* Similar Products */}
			{similarProducts?.length > 0 && (
				<div className="mt-16">
					<h2 className="text-2xl font-semibold text-center mb-4">
						You May Also Like
					</h2>
					<ProductGrid products={similarProducts} />
				</div>
			)}
		</div>
	);
};

export default ProductDetails;
