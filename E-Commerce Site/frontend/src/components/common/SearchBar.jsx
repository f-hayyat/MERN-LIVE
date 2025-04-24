import React from "react";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	fetchProductsByFilters,
	setFilters,
} from "../../redux/slices/productSlice";

const SearchBar = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSearchToggle = () => {
		setIsOpen(!isOpen);
	};
	const handleSearch = (e) => {
		e.preventDefault();
		// Handle search logic here
		dispatch(setFilters({ search: searchTerm }));
		dispatch(fetchProductsByFilters({ search: searchTerm }));
		navigate(`/collections/all?search=${searchTerm}`);
		setSearchTerm("");
		setIsOpen(false);
	};
	return (
		<div
			className={`flex justify-center items-center transition-all duration-300 w-full ${
				isOpen ? "absolute w-full left-0 top-0 bg-white z-50" : "mr-3"
			}`}
		>
			{isOpen ? (
				<form
					onSubmit={handleSearch}
					className="flex items-center justify-center w-full relative"
				>
					<div className="flex items-center w-1/2 relative mt-1 shadow-2xl">
						<input
							type="text"
							placeholder="Search..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500 bg-white"
						/>
						<button
							type="submit"
							className="ml-2 text-gray-700 hover:text-black absolute right-2 top-1/2 transform -translate-y-1/2"
						>
							<IoSearchOutline className="text-2xl" />
						</button>
					</div>
					<button className="text-gray-500 hover:text-black pl-3">
						<MdOutlineCancel
							className="text-2xl"
							onClick={handleSearchToggle}
						/>
					</button>
				</form>
			) : (
				<button
					onClick={handleSearchToggle}
					className="text-gray-700 hover:text-black"
				>
					<IoSearchOutline className="text-2xl" />
				</button>
			)}
		</div>
	);
};

export default SearchBar;
