import React, { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
	fetchCart,
	removeProductFromCart,
	updateProductQuantity,
} from "../../redux/slices/cartSlice";

const CartContents = ({ cart, userId, guestId }) => {
	const dispatch = useDispatch();
	// Handle adding and removing product from cart
	const handleAddToCart = (productId, delta, quantity, size, color) => {
		const newQuantity = quantity + delta;
		if (newQuantity >= 1) {
			dispatch(
				updateProductQuantity({
					productId,
					quantity: newQuantity,
					size,
					color,
					userId,
					guestId,
				})
			);
		}
	};
	const handleRemoveFromCart = (productId, size, color) => {
		dispatch(
			removeProductFromCart({
				productId,
				guestId,
				userId,
				color,
				size,
			})
		);
	};

	return (
		<div className="flex flex-col h-full overflow-y-auto">
			{cart.products.map((product, index) => (
				<div
					key={index}
					className="flex flex-col md:flex-row items-start justify-between py-2 md:py-3 shadow bg-gray-100 my-2 mx-2 px-2 md:px-3 rounded-lg"
				>
					<div className="flex items-center w-full">
						<img
							src={product.image}
							alt={product.name}
							className="h-12 md:h-16 object-cover"
						/>
						<div className="flex flex-col ml-2 md:ml-3 w-full md:w-3/4">
							<h2 className="font-medium text-base md:text-lg text-gray-700 hover:text-black">
								{product.name}
							</h2>
							<span className="text-xs text-gray-500">
								size : {product.size} | color : {product.color}
							</span>
							<div className="flex items-center mt-1 md:mt-2">
								<button
									onClick={() => {
										handleAddToCart(
											product.productId,
											-1,
											product.quantity,
											product.size,
											product.color
										);
									}}
									className="px-1 md:px-2 border rounded-l hover:bg-gray-100 text-gray-700"
								>
									-
								</button>
								<span className="px-2 md:px-4 border-y text-gray-700">
									{product.quantity}
								</span>
								<button
									onClick={() => {
										handleAddToCart(
											product.productId,
											1,
											product.quantity,
											product.size,
											product.color
										);
									}}
									className="px-1 md:px-2 border rounded-r hover:bg-gray-100 text-gray-700"
								>
									+
								</button>
							</div>
						</div>
						<div className="flex items-center justify-end w-full gap-2 md:gap-3">
							<span className="text-base md:text-lg font-semibold text-gray-700">
								{product.price} $
							</span>
							<button
								onClick={() => {
									handleRemoveFromCart(
										product.productId,
										product.size,
										product.color
									);
								}}
								className="ml-2 md:ml-3"
							>
								<RiDeleteBinLine className="text-lg md:text-xl text-red-600" />
							</button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default CartContents;
