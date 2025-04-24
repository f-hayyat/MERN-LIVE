import React from "react";

const OrderManagement = () => {
    const orders = [
        {
            _id: 1,
            user: {
                name: "John Doe",
            },
            totalPrice: 100,
            status: "Pending",
            createdAt: "2023-10-01",
        },
        {
            _id: 2,
            user: {
                name: "Jane Smith",
            },
            totalPrice: 200,
            status: "Shipped",
            createdAt: "2023-10-02",
        },
        {
            _id: 3,
            user: {
                name: "Alice Johnson",
            },
            totalPrice: 150,
            status: "Delivered",
            createdAt: "2023-10-03",
        },
        {
            _id: 4,
            user: {
                name: "Bob Brown",
            },
            totalPrice: 250,
            status: "Cancelled",
            createdAt: "2023-10-04",
        },
    ];

    const handleStatusChange = (orderId, status) => {
        // Handle status change logic here
        console.log(`Order ID: ${orderId}, New Status: ${status}`);
    };
    return (
        <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold mb-6">Order Management</h1>
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <table className="min-w-full text-left text-gray-500">
                    <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Order ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                User
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Created At
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td className="px-6 py-4">{order._id}</td>
                                <td className="px-6 py-4">{order.user.name}</td>
                                <td className="px-6 py-4">${order.totalPrice}</td>
                                <td className="px-6 py-4">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    <select
                                        value={order.status}
                                        onChange={(e) =>
                                            handleStatusChange(order._id, e.target.value)
                                        }
                                        className="border border-gray-300 rounded-md p-2"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleStatusChange(order._id, "Delivered")}
                                        className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                                    >
                                        Mark as Delivered
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderManagement;
