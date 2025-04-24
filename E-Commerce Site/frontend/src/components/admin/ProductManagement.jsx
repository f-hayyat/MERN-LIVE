import React from 'react'
import { Link } from 'react-router-dom';

const ProductManagement = () => {

    const handleDelete = (productId) => {
        // Logic to delete the product
        if (window.confirm('Are you sure you want to delete this product?')) {
            console.log(`Product with ID ${productId} deleted`);
        }
    };
    // Dummy product data
    const products = [
        {
            _id: 1,
            name: 'Product 1',
            price: 100,
            sku: 'SKU123',
        },
        {
            _id: 2,
            name: 'Product 2',
            price: 200,
            sku: 'SKU456',
        },
        {
            _id: 3,
            name: 'Product 3',
            price: 300,
            sku: 'SKU789',
        },
        {
            _id: 4,
            name: 'Product 4',
            price: 400,
            sku: 'SKU101',
        },
    ];
    return (
        <div className='max-w-7xl mx-auto px-4 py-6 bg-white rounded-lg shadow-md'>
            <h1 className='text-3xl font-bold mb-6'>Product Management</h1>
            <div className='overflow-x-auto rounded-lg shadow'>
                <table className='min-w-full bg-white border border-gray-200 rounded-lg shadow-md'>
                    <thead>
                        <tr className='bg-gray-100'>
                            <th className='py-3 px-4 text-left text-gray-600 font-semibold'>Product Name</th>
                            <th className='py-3 px-4 text-center text-gray-600 font-semibold'>Price</th>
                            <th className='py-3 px-4 text-center text-gray-600 font-semibold'>SKU</th>
                            <th className='py-3 px-4 text-center text-gray-600 font-semibold'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id} className='border-b border-gray-200 hover:bg-gray-50'>
                                <td className='py-3 px-4'>{product.name}</td>
                                <td className='py-3 px-4 text-center'>${product.price}</td>
                                <td className='py-3 px-4 text-center'>{product.sku}</td>
                                <td className='py-3 px-4 text-center'>
                                    <Link to={`/admin/products/${product._id}/edit`} className='bg-yellow-500 text-white px-2 py-1 rounded-lg hover:bg-yellow-600'>Edit</Link>
                                    <button onClick={() => { handleDelete(product._id) }} className='bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 ml-2'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='mt-6'>
                <button className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600'>Add Product</button>
            </div>
        </div>
    )
}

export default ProductManagement
