import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };


  useEffect(() => {
    setTimeout(() => {
      setOrders([
        {
          _id: "ORD-001",
          image: "https://picsum.photos/100/100?random=1",
          date: "2025-03-25",
          items: 2,
          price: "$149.98",
          status: "Delivered"
        },
        {
          _id: "ORD-002",
          image: "https://picsum.photos/100/100?random=2",
          date: "2025-03-20",
          items: 1,
          price: "$89.99",
          status: "Processing"
        },
        {
          _id: "ORD-003",
          image: "https://picsum.photos/100/100?random=3",
          date: "2025-03-15",
          items: 3,
          price: "$199.97",
          status: "Delivered"
        },
        {
          _id: "ORD-004",
          image: "https://picsum.photos/100/100?random=4",
          date: "2025-03-15",
          items: 3,
          price: "$143.97",
          status: "Delivered"
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered": return "bg-green-100 text-green-800 border border-green-300";
      case "Processing": return "bg-yellow-100 text-yellow-800 border border-yellow-300";
      default: return "bg-gray-100 text-gray-800 border border-gray-300";
    }
  };

  if (loading) {
    return <p className="text-center py-6 text-lg font-medium">Loading orders...</p>;
  }

  return (
    <div className="overflow-x-auto shadow-lg rounded-xl p-6 bg-white m-10 ">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Orders</h2>
      <table className="w-full text-sm text-left text-gray-600 border border-gray-200 rounded-lg">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-5 py-3 text-left">Image</th>
            <th className="px-5 py-3 text-left">Order ID</th>
            <th className="px-5 py-3 text-left">Date</th>
            <th className="px-5 py-3 text-left">Items</th>
            <th className="px-5 py-3 text-left">Total</th>
            <th className="px-5 py-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr onClick={() => { handleRowClick(order._id) }} key={order._id} className="border-b border-gray-200 hover:bg-gray-50 transition cursor-pointer">
              <td className="px-5 py-4">
                <img src={order.image} alt="Order" className="w-14 h-14 rounded-lg shadow-md" />
              </td>
              <td className="px-5 py-4 font-medium text-gray-900">{order._id}</td>
              <td className="px-5 py-4">{order.date}</td>
              <td className="px-5 py-4">{order.items}</td>
              <td className="px-5 py-4 font-semibold">{order.price}</td>
              <td className="px-5 py-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {orders.length === 0 && (
        <p className="text-center py-6 text-gray-500">No orders found</p>
      )}
    </div>
  );
};

export default MyOrders;