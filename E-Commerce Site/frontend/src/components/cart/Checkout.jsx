import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
	const cart = {
		products: [
			{
				id: 1,
				name: "Classic T-Shirt",
				size: "M",
				color: "Blue",
				price: 29.99,
				image: "https://picsum.photos/200/300?random=1",
			},
			{
				id: 2,
				name: "Denim Jeans",
				size: "32",
				color: "Dark Blue",
				price: 59.99,
				image: "https://picsum.photos/200/300?random=2",
			},
			{
				id: 3,
				name: "Running Shoes",
				size: "42",
				color: "Black",
				price: 89.99,
				image: "https://picsum.photos/200/300?random=3",
			},
		],
		totalPrice: 179.97,
	};
	const navigate = useNavigate();
	const [checkoutId, setCheckoutId] = useState(null);
	const [shippingAddress, setShippingAddress] = useState({
		firstName: "",
		lastName: "",
		address: "",
		city: "",
		postalCode: "",
		country: "",
		phone: "",
	});

	const handleCreateCheckout = async (e) => {
		e.preventDefault();
		// Simulate a checkout process
		const orderId = Math.floor(Math.random() * 10000); // Simulated order ID
		setCheckoutId(orderId);
		// Here you would typically send the order details to your backend for processing
		console.log("Order Created:", { ...shippingAddress, orderId });
	};
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-10 px-6 max-w-7xl mx-auto">
			{/* left side  */}
			<div className="bg-white rounded-lg shadow-md p-6">
				<h2 className="text-2xl uppercase mb-6 font-semibold">Checkout</h2>
				<form onSubmit={handleCreateCheckout}>
					<h3 className="text-lg mb-4 font-semibold">Contact Details</h3>
					<div className="mb-4">
						<label htmlFor="email" className="block text-gray-600 mb-2">
							Email
						</label>
						<input
							type="email"
							id="email"
							className="border border-gray-300 rounded-lg p-2 w-full"
							placeholder="Enter your email"
							required
						/>
					</div>
					<h3 className="text-lg mb-4 font-semibold">Delivery</h3>
					<div className="grid grid-cols-2 gap-4 mb-4">
						<div className="mb-4">
							<label htmlFor="firstName" className="block mb-2 text-gray-600">
								First Name
							</label>
							<input
								type="text"
								id="firstName"
								className="border border-gray-300 rounded-lg p-2 w-full"
								placeholder="First Name"
								required
								onChange={(e) =>
									setShippingAddress({
										...shippingAddress,
										firstName: e.target.value,
									})
								}
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="lastName" className=" text-gray-600 block mb-2">
								Last Name
							</label>
							<input
								type="text"
								id="lastName"
								className="border border-gray-300 rounded-lg p-2 w-full"
								placeholder="Last Name"
								required
								onChange={(e) =>
									setShippingAddress({
										...shippingAddress,
										lastName: e.target.value,
									})
								}
							/>
						</div>
					</div>
					<div className="mb-4">
						<label htmlFor="address" className="block mb-2 text-gray-600">
							Address
						</label>
						<input
							type="text"
							id="address"
							className="border border-gray-300 rounded-lg p-2 w-full"
							placeholder="Enter your complete address..."
							required
							onChange={(e) =>
								setShippingAddress({
									...shippingAddress,
									address: e.target.value,
								})
							}
						/>
					</div>
					<div className="grid grid-cols-2 gap-4 mb-4">
						<div className="mb-4">
							<label htmlFor="city" className="block mb-2 text-gray-600">
								City
							</label>
							<input
								type="text"
								id="city"
								className="border border-gray-300 rounded-lg p-2 w-full"
								placeholder="City Name"
								required
								onChange={(e) =>
									setShippingAddress({
										...shippingAddress,
										city: e.target.value,
									})
								}
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="postalCode" className="block mb-2 text-gray-600">
								Postal Code
							</label>
							<input
								type="text"
								id="postalCode"
								className="border border-gray-300 rounded-lg p-2 w-full"
								placeholder="Postal Code"
								required
								onChange={(e) =>
									setShippingAddress({
										...shippingAddress,
										postalCode: e.target.value,
									})
								}
							/>
						</div>
					</div>
					<div className="mb-4">
						<label htmlFor="country" className="block mb-2 text-gray-600">
							Country
						</label>
						<input
							type="text"
							id="country"
							className="border border-gray-300 rounded-lg p-2 w-full"
							placeholder="Country Name"
							required
							onChange={(e) =>
								setShippingAddress({
									...shippingAddress,
									country: e.target.value,
								})
							}
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="phone" className="block mb-2 text-gray-600">
							Phone
						</label>
						<input
							type="text"
							id="phone"
							className="border border-gray-300 rounded-lg p-2 w-full"
							placeholder="Phone Number"
							required
							onChange={(e) =>
								setShippingAddress({
									...shippingAddress,
									phone: e.target.value,
								})
							}
						/>
					</div>
					<div className="mb-6">
						{!checkoutId ? (
							<button
								type="button"
								className="bg-gray-800 hover:bg-black text-white rounded-lg px-4 py-2 w-full"
							>
								Proceed to Payment
							</button>
						) : (
							<h3>
								Your order has been placed successfully! Your order ID is{" "}
								{checkoutId}. <br />
								<button
									type="button"
									className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-4"
									onClick={() => navigate("/orders")}
								>
									View Orders
								</button>
							</h3>
						)}
					</div>
				</form>
			</div>
			{/* Right Side */}
			<div className="bg-white rounded-lg shadow-md p-6">
				<h2 className="text-2xl uppercase mb-6 font-semibold">Order Summary</h2>
				<div className="border-t py-4 mb-6">
					{cart.products.map((product) => (
						<div key={product.id} className="flex items-center mb-4">
							<img
								src={product.image}
								alt={product.name}
								className="w-16 h-16 rounded-lg mr-4"
							/>
							<div className="flex-grow">
								<h3 className="text-lg font-semibold">{product.name}</h3>
								<p className="text-gray-600">Size: {product.size}</p>
								<p className="text-gray-600">Color: {product.color}</p>
							</div>
							<p className="text-lg font-semibold">
								${product.price.toFixed(2)}
							</p>
						</div>
					))}
				</div>
				<div className="border-t pt-4 flex justify-between items-center">
					<h3 className="text-lg font-semibold">Items</h3>
					<p className="text-gray-600">{cart.products.length} </p>
				</div>
				<div className="border-t pt-4 flex justify-between items-center">
					<h3 className="text-lg font-semibold">Subtotal</h3>
					<p className="text-gray-600">${cart.totalPrice.toFixed(2)}</p>
				</div>
				<div className="border-t pt-4 flex justify-between items-center">
					<h3 className="text-lg font-semibold">Shipping</h3>
					<p className="text-gray-600">$ 10</p>
				</div>
				<div className="border-t pt-4 flex justify-between items-center">
					<h3 className="text-lg font-semibold">Tax</h3>
					<p className="text-gray-600">$ 0</p>
				</div>
				<div className="border-t pt-4 flex justify-between items-center">
					<h3 className="text-lg font-semibold">Discount</h3>
					<p className="text-gray-600">$ 0</p>
				</div>
				<div className="border-t pt-4 flex justify-between items-center">
					<h3 className="text-lg font-semibold">Total</h3>
					<p className="text-gray-600">${(cart.totalPrice + 10).toFixed(2)}</p>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
