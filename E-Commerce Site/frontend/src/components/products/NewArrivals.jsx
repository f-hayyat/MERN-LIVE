import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NewArrivals = () => {
	const [newArrivals, setNewArrivals] = useState([]);
	const navigate = useNavigate();
	// Fetch new arrivals from backend
	useEffect(() => {
		const fetchNewArrivals = async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_BASE_URL}/api/products/newarrivals`
				);
				setNewArrivals(response.data); // response.data is the array of products
			} catch (error) {
				console.error("Error fetching new arrivals:", error);
			}
		};

		fetchNewArrivals();
	}, []);

	const handleProductClick = (productId) => {
		navigate(`/product/${productId}`);
	};

	return (
		<section className="py-10">
			<div className="container mx-auto py-10 px-4">
				<h2 className="text-3xl font-bold mb-6 text-center">New Arrivals</h2>
				<p className="text-center text-gray-600 mb-6">
					Check out the latest additions to our collection.
				</p>
				<div className="flex overflow-x-auto space-x-6 pb-4">
					{newArrivals.map((product) => (
						<div
							key={product._id}
							className="flex-shrink-0 w-64 bg-white shadow-lg rounded-lg overflow-hidden"
							onClick={() => handleProductClick(product._id)}
						>
							<img
								src={product.images[0].url}
								alt={product.name}
								className="w-full h-48 object-cover"
							/>
							<div className="p-4">
								<h3 className="text-lg font-semibold">{product.name}</h3>
								<p className="text-gray-600">${product.price}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default NewArrivals;
