import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../redux/slices/adminOrdersSlice";
import { fetchAllProducts } from "../redux/slices/adminProductsSlice";

const AdminHomePage = () => {
	const dispatch = useDispatch();
	const {
		orders,
		totalOrders,
		totalSales,
		loading: ordersLoading,
		error: ordersError,
	} = useSelector((state) => state.adminOrders);
	const {
		products,
		loading: productsLoading,
		error: productsError,
	} = useSelector((state) => state.adminProducts);

	useEffect(() => {
		dispatch(fetchAllOrders());
		dispatch(fetchAllProducts());
	}, [dispatch]);
	return (
		<div className="max-w-7xl mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
			{productsLoading || ordersLoading ? (
				<p>Loading...</p>
			) : productsError ? (
				<p className="text-red-500">Error fetching products: {productsError}</p>
			) : ordersError ? (
				<p className="text-red-500">Error fetching orders: {ordersError}</p>
			) : (
				<>
					{/* Statistics Section */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						<div className="p-4 shadow-md rounded-lg bg-white">
							<h2 className="text-lg font-semibold">Revenue</h2>
							<p className="text-2xl">${totalSales.toFixed(2)}</p>
						</div>
						<div className="p-4 shadow-md rounded-lg bg-white">
							<h2 className="text-lg font-semibold">Total Orders</h2>
							<p className="text-2xl">{totalOrders}</p>
							<Link
								to="/admin/orders"
								className="text-blue-500 hover:underline"
							>
								Manage Orders
							</Link>
						</div>
						<div className="p-4 shadow-md rounded-lg bg-white">
							<h2 className="text-lg font-semibold">Total Products</h2>
							<p className="text-2xl">{products?.length}</p>
							<Link
								to="/admin/products"
								className="text-blue-500 hover:underline"
							>
								Manage Products
							</Link>
						</div>
					</div>
				</>
			)}

			{/* Recent Orders Section */}
			<div className="mt-6 ">
				<h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
				<table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
					<thead className="bg-gray-200">
						<tr>
							<th className="py-2 px-4 text-left">Order ID</th>
							<th className="py-2 px-4 text-left">Customer</th>
							<th className="py-2 px-4 text-left">Price</th>
							<th className="py-2 px-4 text-left">Status</th>
						</tr>
					</thead>
					<tbody>
						{orders ? (
							orders.map((order) => (
								<tr key={order._id} className="border-b hover:bg-gray-100">
									<td className="py-2 px-4">{order._id}</td>
									<td className="py-2 px-4">{order.user.name}</td>
									<td className="py-2 px-4">${order.totalPrice.toFixed(2)}</td>
									<td className="py-2 px-4">{order.status}</td>
								</tr>
							))
						) : (
							<tr>
								<td className="py-2 px-4 text-center" colSpan={4}>
									No recent orders
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AdminHomePage;
