import React from 'react';

const features = [
    { title: "Free Shipping", description: "On all orders over $50", icon: "🚚" },
    { title: "Easy Returns", description: "30-day return policy", icon: "🔄" },
    { title: "Customer Support", description: "24/7 support available", icon: "📞" },
];

const FeatureSection = () => {
    return (
        <section className="py-16 px-6 bg-gray-100">
            <div className="container mx-auto max-w-5xl text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Shop With Us?</h2>
                <p className="text-gray-600 mb-12">
                    We offer the best services to ensure a seamless shopping experience.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div 
                            key={index} 
                            className="flex flex-col items-center bg-white p-8 rounded-xl shadow-lg transition-transform transform hover:scale-105"
                        >
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                            <p className="text-gray-600 text-center mt-2">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureSection;
