import React from "react";
import menCollectionImage from "../../assets/mens-collection.webp";
import womenCollectionImage from "../../assets/womens-collection.webp";
import { Link } from "react-router-dom";

const GenderCollectionSection = () => {
    return (
        <section className="py-10 px-4">
            <div className="container mx-auto flex flex-col md:flex-row items-center text-center gap-8">
                <div className="flex-1 mb-6 md:mb-0 relative">
                    <img
                        src={womenCollectionImage}
                        alt="Women's Collection"
                        className="w-full object-cover h-[600px]  rounded-lg "
                    />
                    <div className="absolute bottom-4 left-4 bg-gray-500/70 p-4 rounded-2xl">
                        <h2 className="text-2xl font-bold text-gray-300">
                            Women's Collection
                        </h2>
                        <p className="text-sm text-gray-200">Discover the latest trends</p>
                        <Link to="" className="text-gray-200 hover:text-white  mt-2 inline-block underline">
                            Shop Now
                        </Link>
                    </div>
                </div>
                <div className="flex-1 mb-6 md:mb-0 relative">
                    <img
                        src={menCollectionImage}
                        alt="Men's Collection"
                        className="w-full object-cover h-[600px]  rounded-lg"
                    />
                    <div className="absolute bottom-4 left-4 bg-gray-500/70 p-4 px-10 rounded-2xl">
                        <h2 className="text-2xl font-bold text-gray-300">
                            Men's Collection
                        </h2>
                        <p className="text-sm text-gray-200">Discover the latest trends</p>
                        <Link to="" className="text-gray-200 hover:text-white  mt-2 inline-block underline">
                            Shop Now
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GenderCollectionSection;
