import React from 'react';

const checkout = {
    _id: 1,
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
};

const OrderConfirmation = () => {
    return (
        <div className='max-w-4xl mx-auto my-10 py-12 px-8 bg-white shadow-lg rounded-xl'>
            <h1 className='text-4xl font-extrabold mb-6 text-emerald-700 text-center'>Order Confirmed 🎉</h1>
            <p className='text-lg text-gray-700 text-center mb-8'>Thank you for your purchase! Your order has been placed successfully.</p>
            {checkout && (
                <div className='p-6 rounded-xl border border-gray-200 bg-gray-50'>
                    <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Order Details</h2>
                    <p className='text-gray-700 mb-2'><strong>Order ID:</strong> #{checkout._id}</p>
                    <p className='text-gray-700 mb-2'><strong>Order Date:</strong> {new Date(checkout.createdAt).toLocaleDateString()}</p>
                    <p className='text-gray-700 mb-6'><strong>Shipping Address:</strong> {checkout.shippingAddress.address}, {checkout.shippingAddress.city}, {checkout.shippingAddress.country}</p>

                    <h3 className='text-xl font-semibold text-gray-800 mb-4'>Items Ordered</h3>
                    <ul className='divide-y divide-gray-300'>
                        {checkout.checkoutItems.map(item => (
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
                </div>
            )}
        </div>
    );
};

export default OrderConfirmation;