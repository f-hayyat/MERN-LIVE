import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
	fetchProductsByFilters,
	setFilters,
} from "../../redux/slices/productSlice";

const SortOptions = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const sort = searchParams.get("sortBy");
	const handleSortChange = (event) => {
		const selectedSort = event.target.value;
		if (selectedSort) {
			searchParams.set("sortBy", selectedSort);
		} else {
			searchParams.delete("sortBy");
		}
		setSearchParams(searchParams);

		// Dispatch Redux action to update filters and fetch products
		dispatch(setFilters({ sortBy: selectedSort }));
		dispatch(fetchProductsByFilters({ sortBy: selectedSort }));
		navigate(`/collections/all?sortBy=${selectedSort}`);
	};
	return (
		<div className="flex items-center justify-end mb-4">
			<label htmlFor="sort" className="mr-2 text-gray-700">
				Sort by:
			</label>
			<select
				onChange={handleSortChange}
				value={sort || ""}
				id="sort"
				className="border border-gray-300 rounded p-2 w-48 md:w-auto relative"
			>
				<option value="">Select an option</option>
				<option value="priceAsc">Price: Low to High</option>
				<option value="priceDesc">Price: High to Low</option>
				<option value="popularity">Popularity</option>
			</select>
		</div>
	);
};

export default SortOptions;
