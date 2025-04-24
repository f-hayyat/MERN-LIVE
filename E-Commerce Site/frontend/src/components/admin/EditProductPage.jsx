import React, { useState, useEffect } from "react";

const EditProductPage = () => {
    const [productData, setProductData] = useState({
        name: "",
        price: "",
        description: "",
        category: "",
        sku: "",
        countInStock: "",
        brand: "",
        sizes: [],
        colors: [],
        collections: "",
        material: "",
        gender: "",
        images: [
            {
                url: "https://picsum.photos/150?random=1",
            },
            {
                url: "https://picsum.photos/150?random=2",
            },
        ],
    });

    // Revoke object URLs on unmount to avoid memory leaks
    useEffect(() => {
        return () => {
            productData.images.forEach((image) => {
                if (image.url.startsWith("blob:")) {
                    URL.revokeObjectURL(image.url);
                }
            });
        };
    }, [productData.images]);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const imageUrls = files.map((file) => ({
            url: URL.createObjectURL(file),
        }));

        setProductData({
            ...productData,
            images: imageUrls,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Product data submitted:", productData);
    }

    return (
        <div className="max-w-5xl mx-auto bg-white p-8 shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">
                Edit Product
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* name */}
                <div>
                    <label htmlFor="product-name" className="block text-sm font-medium text-gray-700 mb-2">
                        Product Name
                    </label>
                    <input
                        type="text"
                        id="product-name"
                        value={productData.name}
                        onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter product name"
                    />
                </div>

                {/* price */}
                <div>
                    <label htmlFor="product-price" className="block text-sm font-medium text-gray-700 mb-2">
                        Price
                    </label>
                    <input
                        type="number"
                        id="product-price"
                        value={productData.price}
                        onChange={(e) => setProductData({ ...productData, price: Number(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter product price"
                    />
                </div>

                {/* description */}
                <div>
                    <label htmlFor="product-description" className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                    </label>
                    <textarea
                        id="product-description"
                        value={productData.description}
                        onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter product description"
                    />
                </div>

                {/* category */}
                <div>
                    <label htmlFor="product-category" className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                    </label>
                    <input
                        type="text"
                        id="product-category"
                        value={productData.category}
                        onChange={(e) => setProductData({ ...productData, category: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter product category"
                    />
                </div>

                {/* sku */}
                <div>
                    <label htmlFor="product-sku" className="block text-sm font-medium text-gray-700 mb-2">
                        SKU
                    </label>
                    <input
                        type="text"
                        id="product-sku"
                        value={productData.sku}
                        onChange={(e) => setProductData({ ...productData, sku: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter product SKU"
                    />
                </div>

                {/* countInStock */}
                <div>
                    <label htmlFor="product-countInStock" className="block text-sm font-medium text-gray-700 mb-2">
                        Count In Stock
                    </label>
                    <input
                        type="number"
                        id="product-countInStock"
                        min={0}
                        value={productData.countInStock}
                        onChange={(e) => setProductData({ ...productData, countInStock: Number(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter stock count"
                    />
                </div>

                {/* brand */}
                <div>
                    <label htmlFor="product-brand" className="block text-sm font-medium text-gray-700 mb-2">
                        Brand
                    </label>
                    <input
                        type="text"
                        id="product-brand"
                        value={productData.brand}
                        onChange={(e) => setProductData({ ...productData, brand: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter brand"
                    />
                </div>

                {/* sizes */}
                <div>
                    <label htmlFor="product-sizes" className="block text-sm font-medium text-gray-700 mb-2">
                        Sizes (comma separated)
                    </label>
                    <input
                        type="text"
                        id="product-sizes"
                        value={productData.sizes.join(", ")}
                        onChange={(e) =>
                            setProductData({
                                ...productData,
                                sizes: e.target.value.split(",").map((size) => size.trim()),
                            })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. S, M, L, XL"
                    />
                </div>

                {/* colors */}
                <div>
                    <label htmlFor="product-colors" className="block text-sm font-medium text-gray-700 mb-2">
                        Colors (comma separated)
                    </label>
                    <input
                        type="text"
                        id="product-colors"
                        value={productData.colors.join(", ")}
                        onChange={(e) =>
                            setProductData({
                                ...productData,
                                colors: e.target.value.split(",").map((color) => color.trim()),
                            })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. Red, Blue, Green"
                    />
                </div>

                {/* collections */}
                <div>
                    <label htmlFor="product-collections" className="block text-sm font-medium text-gray-700 mb-2">
                        Collections
                    </label>
                    <input
                        type="text"
                        id="product-collections"
                        value={productData.collections}
                        onChange={(e) => setProductData({ ...productData, collections: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter collections"
                    />
                </div>

                {/* material */}
                <div>
                    <label htmlFor="product-material" className="block text-sm font-medium text-gray-700 mb-2">
                        Material
                    </label>
                    <input
                        type="text"
                        id="product-material"
                        value={productData.material}
                        onChange={(e) => setProductData({ ...productData, material: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter material"
                    />
                </div>

                {/* images */}
                <div>
                    <label htmlFor="product-images" className="block text-sm font-medium text-gray-700 mb-2">
                        Images
                    </label>
                    <input
                        type="file"
                        id="product-images"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />

                    {/* image previews */}
                    <div className="mt-4 flex gap-4">
                        {productData.images.map((image, idx) => (
                            <div key={idx} className="border rounded-md overflow-hidden">
                                <img
                                    src={image.url}
                                    alt={`Preview ${idx}`}
                                    className="w-full h-20 object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-700 transition duration-200">
                        Update Product
                </button>
            </form>
        </div>
    );
};

export default EditProductPage;
