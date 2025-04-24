import React, { useMemo } from "react";
import { FaFilter } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import FilterSidebar from "../components/products/FilterSidebar";
import SortOptions from "../components/products/SortOptions";
import ProductGrid from "../components/products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productSlice";

const CollectionsPage = () => {
	const { collection } = useParams();
	const [searchParams] = useSearchParams();
	const dispatch = useDispatch();
	const { products, loading, error } = useSelector((state) => state.products);
	const queryParams = useMemo(() => {
		return Object.fromEntries([...searchParams]);
	}, [searchParams]);
	const sidebarRef = useRef(null);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	useEffect(() => {
		// Fetch products based on collection and query params
		dispatch(fetchProductsByFilters({ collection, ...queryParams }));
	}, [dispatch, collection, queryParams]);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};
	const closeSidebar = () => {
		setIsSidebarOpen(false);
	};
	const handleClickOutside = (event) => {
		if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
			closeSidebar();
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [sidebarRef]);

	return (
		<div className="flex flex-col lg:flex-row">
			{/* mobile filter button */}
			<button
				onClick={toggleSidebar}
				className="flex justify-center items-center p-2 lg:hidden"
			>
				<FaFilter className="mr-2" />
				Filters
			</button>
			{/* filter sidebar */}
			<div
				ref={sidebarRef}
				className={`${
					isSidebarOpen ? "translate-x-0" : "-translate-x-full"
				} fixed top-0 left-0 w-64 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out z-50 lg:relative lg:translate-x-0 lg:block`}
			>
				<FilterSidebar />
			</div>
			<div className="flex-grow p-4">
				<h2 className="text-2xl uppercase mb-4">All Collections</h2>
				{/* sort options */}
				<SortOptions />
				{/* product grid */}
				<ProductGrid products={products} loading={loading} error={error} />
			</div>
		</div>
	);
};

export default CollectionsPage;
