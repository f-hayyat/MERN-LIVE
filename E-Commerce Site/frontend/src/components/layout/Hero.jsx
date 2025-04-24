import React from "react";
import heroImage from "../../assets/rabbit-hero.webp";
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <section className="relative">
            <img
                className="object-cover sm:h-[400px] md:h-[600px] lg:h-[750px] w-full"
                src={heroImage}
                alt="hero image"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center px-4">
                    Welcome to Our Store
                </h1>
                <p className="text-lg md:text-xl mb-6 text-center px-4">
                    Discover the latest trends and styles in fashion.
                </p>
                <Link
                    to="/shop"
                    className="bg-gray-800 hover:bg-black text-white rounded-md px-6 py-3 transition-all"
                >
                    Shop Now
                </Link>
            </div>
        </section>
    );
};

export default Hero;
