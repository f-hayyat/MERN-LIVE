import React, { useState } from "react";
import { Link } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { BsCart4 } from "react-icons/bs";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { MdOutlineCancel } from "react-icons/md";
import SearchBar from "./SearchBar";
import CartDrawer from "../layout/CartDrawer";
import { useSelector } from "react-redux";

const Navbar = () => {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const { cart } = useSelector((state) => state.cart);
	const cartItemsCount =
    cart?.products?.reduce((total, product) => {
        return total + product.quantity;
    }, 0) || 0;

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};
	const handleMobileMenuOpen = () => {
		setIsMobileMenuOpen(true);
	};

	const toggleDrawer = () => {
		setDrawerOpen(!drawerOpen);
	};

	const handleDrawerOpen = () => {
		setDrawerOpen(true);
	};
	return (
		<>
			<nav className="conatiner mx-auto flex justify-between items-center py-4 shadow">
				<div>
					<Link
						to="/"
						className="font-medium text-2xl text-gray-700 hover:text-black ml-2"
					>
						E-Commerce
					</Link>
				</div>
				<div className="hidden md:flex space-x-5">
					<Link
						to="/collections/all?gender=Men"
						className="text-gray-700 font-medium text-sm hover:text-black uppercase"
					>
						Men
					</Link>
					<Link
						to="/collections/all?gender=Women"
						className="text-gray-700 font-medium text-sm hover:text-black uppercase"
					>
						{" "}
						Women
					</Link>
					<Link
						to="/collections/all?category=Top Wear"
						className="text-gray-700 font-medium text-sm hover:text-black uppercase"
					>
						{" "}
						Top Wear
					</Link>
					<Link
						to="/collections/all?category=Bottom Wear"
						className="text-gray-700 font-medium text-sm hover:text-black uppercase"
					>
						{" "}
						Bottom Wear
					</Link>
				</div>
				{/* Right icons */}
				<div className="flex items-center space-x-5 mr-2">
					<Link
						to="/admin"
						className="text-white bg-gray-800 hover:bg-black px-3 py-1 rounded-md block"
					>
						<span className="text-sm font-medium">Admin</span>
					</Link>
					<Link to="/profile" className="text-gray-700 hover:text-black ">
						<VscAccount className="text-2xl" />
					</Link>
					<button
						onClick={handleDrawerOpen}
						className="text-gray-700 hover:text-black relative "
					>
						<BsCart4 className="text-2xl" />
						<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold px-1 rounded-full">
							{cartItemsCount}
						</span>
					</button>
					<SearchBar />
					<button
						onClick={handleMobileMenuOpen}
						className="text-gray-700 hover:text-black md:hidden mr-2 "
					>
						<HiMiniBars3BottomRight className="text-2xl" />
					</button>
				</div>
			</nav>
			{/* cart drawer open */}
			<CartDrawer toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} />
			{/* mobile menu open */}
			<div
				className={`fixed top-0 left-0 flex flex-col w-2/3 h-full bg-white shadow-lg z-50 transition-transform transform ${
					isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div>
					<button
						onClick={toggleMobileMenu}
						className="absolute top-2 sm:top-3 right-2 sm:right-3 hover:text-black text-gray-500"
					>
						<MdOutlineCancel className="text-xl sm:text-2xl font-extralight" />
					</button>
				</div>
				<nav className="flex flex-col h-full overflow-y-auto">
					<h2 className="font-bold text-2xl mx-auto mt-10">Menu</h2>
					<div className="flex flex-col items-start mt-10 ml-5 pl-5 border-l space-y-5">
						<Link
							to="/collections/all?gender=Men"
							className="text-gray-700 font-medium text-sm hover:text-black uppercase"
							onClick={toggleMobileMenu}
						>
							Men
						</Link>
						<Link
							to="/collections/all?gender=Women"
							className="text-gray-700 font-medium text-sm hover:text-black uppercase"
							onClick={toggleMobileMenu}
						>
							Women
						</Link>
						<Link
							to="/collections/all?category=Top Wear"
							className="text-gray-700 font-medium text-sm hover:text-black uppercase"
							onClick={toggleMobileMenu}
						>
							Top Wear
						</Link>
						<Link
							to="/collections/all?category=Bottom Wear"
							className="text-gray-700 font-medium text-sm hover:text-black uppercase"
							onClick={toggleMobileMenu}
						>
							Bottom Wear
						</Link>
					</div>
				</nav>
			</div>
		</>
	);
};

export default Navbar;
