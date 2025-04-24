import React from "react";
import { useNavigate } from "react-router-dom";

const ProductGrid = ({ products , loading , error }) => {
    if (loading) {
        return <div className="text-center">Loading...</div>;
    }
    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }
    const navigate = useNavigate();
    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };
    return (
        <div className="container mx-auto py-10 ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-6">
                {products.map((product) => (
                    <div onClick={()=>{handleProductClick(product._id)}} key={product._id} className="bg-white shadow-md rounded-lg p-2">
                        <img
                            src={product?.images?.[0].url}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <h2 className="text-lg mt-2">{product.name}</h2>
                        <p className="text-gray-600">Price: ${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;
