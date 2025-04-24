import React, { useState } from "react";
import Hero from "../components/layout/Hero";
import GenderCollectionSection from "../components/products/GenderCollectionSection";
import NewArrivals from "../components/products/NewArrivals";
import ProductDetails from "../components/layout/ProductDetails";
import ProductGrid from "../components/products/ProductGrid";
import FeatureProducts from "../components/products/FeatureProducts";
import FeatureSection from "../components/products/FeatureSection";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productSlice";
import axios from "axios";

const Home = () => {
	const dispatch = useDispatch();
	const { products, loading, error } = useSelector((state) => state.products);
	const [bestSellerProduct, setBestSellerProduct] = useState(null);

	useEffect(() => {
		// fetch products for a specific collection
		dispatch(
			fetchProductsByFilters({
				gender: "Women",
				category: "Bottom Wear",
				limit: 8,
			})
      
		);
    // fetch best seller products
      const fetchBestSeller = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/products/bestsellers`
          );
          setBestSellerProduct(response.data);
        } catch (error) {
          console.error("Error fetching best sellers:", error);
        }
      }
      fetchBestSeller();
	}, [dispatch]);

	return (
		<>
			<Hero />
			<GenderCollectionSection />
			<NewArrivals />
			<div className="text-center py-10">
				<h2 className="text-3xl font-bold mb-4">Best Sellers</h2>
				<p className="text-gray-600 mb-10">
					Discover our most popular products.
				</p>
        {bestSellerProduct ? (<ProductDetails productId={bestSellerProduct._id} />) : (<p className="text-center">Loading best seller product...</p>)}
				
			</div>
			<div className="text-center py-10">
				<h2 className="text-3xl font-bold mb-4">Top Wears For Women</h2>
				<p className="text-gray-600 mb-2">Handpicked just for you.</p>
				<ProductGrid products={products} loading={loading} error={error} />
			</div>
			<FeatureProducts />
			<FeatureSection />
		</>
	);
};

export default Home;
