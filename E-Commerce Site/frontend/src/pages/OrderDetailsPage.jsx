import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const OrderDetailsPage = () => {
    const { id } = useParams();
    const [orderDetails, setOrderDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const mockOrderData = {
            _id: id,
            createdAt: new Date(),
            checkoutItems: [
                {
                    id: 1,
                    name: "Classic T-Shirt",
                    size: "M",
                    color: "Blue",
                    price: 29.99,
                    image: "https://picsum.photos/200/300?random=1"
                },
                {
                    id: 2,
                    name: "Denim Jeans",
                    size: "32",
                    color: "Dark Blue",
                    price: 59.99,
                    image: "https://picsum.photos/200/300?random=2"
                },
                {
                    id: 3,
                    name: "Running Shoes",
                    size: "42",
                    color: "Black",
                    price: 89.99,
                    image: "https://picsum.photos/200/300?random=3"
                }
            ],
            shippingAddress: {
                address: "123 Main St",
                city: "New York",
                country: "USA",
            },
            totalPrice: 179.97,
            status: "Shipped",
        };
        setOrderDetails(mockOrderData);
    }, [id]);

    return (

        <div className=' py-10 px-6 max-w-5xl mx-auto'>

            <div className='bg-white rounded-lg shadow-md p-6'>
                <h2 className='text-2xl uppercase mb-6 font-semibold'>Order Details</h2>
                {orderDetails && (
                    <div className='p-6 rounded-xl border border-gray-200 bg-gray-50'>
                        <h3 className='text-lg mb-4 font-semibold'>Order ID: #{orderDetails._id}</h3>
                        <p className='text-gray-700 mb-2'><strong>Order Date:</strong> {new Date(orderDetails.createdAt).toLocaleDateString()}</p>
                        <p className='text-gray-700 mb-2'><strong>Status:</strong> {orderDetails.status}</p>
                        <p className='text-gray-700 mb-6'><strong>Shipping Address:</strong> {orderDetails.shippingAddress.address}, {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.country}</p>

                        <h3 className='text-xl font-semibold text-gray-800 mb-4'>Items Ordered</h3>
                        <ul className='divide-y divide-gray-300'>
                            {orderDetails.checkoutItems.map(item => (
                                <li key={item.id} className='flex items-center py-4 space-x-6'>
                                    <img src={item.image} alt={item.name} className='w-20 h-20 object-cover rounded-lg shadow-md' />
                                    <div className='flex-1'>
                                        <h4 className='text-lg font-semibold text-gray-900'>{item.name}</h4>
                                        <p className='text-gray-600 text-sm'>Size: {item.size} | Color: {item.color}</p>
                                    </div>
                                    <p className='text-lg font-bold text-emerald-700'>${item.price.toFixed(2)}</p>
                                </li>
                            ))}
                        </ul>

                        <div className='mt-6 flex justify-between items-center'>
                            <span className='text-xl font-bold text-gray-900'>Total Price:</span>
                            <span className='text-xl font-bold text-emerald-700'>${orderDetails.totalPrice.toFixed(2)}</span>
                        </div>
                    </div>

                )}
            </div>
            <div className='mt-6'>
                <button onClick={()=>{navigate('/my-orders')}} className='bg-emerald-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-emerald-800 transition duration-200'>
                    Back to Orders
                </button>
            </div>

        </div>
    );
};

export default OrderDetailsPage;
