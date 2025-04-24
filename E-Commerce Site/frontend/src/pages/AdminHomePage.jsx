import React from 'react';
import { Link } from 'react-router-dom';

const AdminHomePage = () => {
    const orders = [
        {
            _id: '12345',
            user: {
                name: 'John Doe',
            },
            totalPrice: 50.0,
            status: 'Shipped',
        },
        {
            _id: '12346',
            user: {
                name: 'Jane Smith',
            },
            totalPrice: 75.0,
            status: 'Processing',
        },
        {
            _id: '12347',
            user: {
                name: 'Alice Johnson',
            },
            totalPrice: 100.0,
            status: 'Delivered',
        },
    ];

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            {/* Statistics Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 shadow-md rounded-lg bg-white">
                    <h2 className="text-lg font-semibold">Revenue</h2>
                    <p className="text-2xl">$10,000</p>
                </div>
                <div className="p-4 shadow-md rounded-lg bg-white">
                    <h2 className="text-lg font-semibold">Total Orders</h2>
                    <p className="text-2xl">200</p>
                    <Link to="/admin/orders" className="text-blue-500 hover:underline">
                        Manage Orders
                    </Link>
                </div>
                <div className="p-4 shadow-md rounded-lg bg-white">
                    <h2 className="text-lg font-semibold">Total Products</h2>
                    <p className="text-2xl">100</p>
                    <Link to="/admin/products" className="text-blue-500 hover:underline">
                        Manage Products
                    </Link>
                </div>
            </div>

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
                        {orders.length > 0 ? (
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
