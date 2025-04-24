import React from 'react'
import { Link } from 'react-router-dom'
import featureImage from "../../assets/featured.webp"

const FeatureProducts = () => {
    return (
        <section className="py-10 px-4 ">
            <div className="container mx-auto flex flex-col-reverse lg:flex-row bg-green-50 rounded-2xl shadow-lg px-4 py-6 gap-3">
                <div className="lg:w-1/2 text-center ">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2 lg:mb-10">Comfort and Style</h2>
                    <h2 className="text-gray-800 text-4xl lg:text-5xl font-bold mb-7 lg:mb-15">
                        Apparel made for your everyday life
                    </h2>
                    <p className='text-gray-600 text-lg mb-7 lg:mb-13 lg:text-left lg:pl-9'>
                        Experience our thoughtfully designed collection that combines comfort with style. From casual essentials to statement pieces, our apparel is crafted to enhance your everyday moments with lasting quality and contemporary appeal.
                    </p>
                    <Link to="/collection-all" className="text-lg text-white bg-gray-800 hover:bg-black rounded-2xl py-2 px-4  ">Shop Now</Link>
                </div>
                <div className="lg:w-1/2 flex justify-center">
                    <img
                        src={featureImage}
                        alt="Featured Product"
                        className="w-auto h-[400px] object-cover rounded-lg"
                    />
                </div>
            </div>
        </section>
    )
}

export default FeatureProducts
