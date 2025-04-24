import React, { useEffect, useMemo } from "react";
import { MdOutlineCancel } from "react-icons/md";
import CartContents from "../cart/CartContents";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../redux/slices/cartSlice";

const CartDrawer = ({ toggleDrawer, drawerOpen }) => {
	const dispatch = useDispatch();
	const { user, guestId } = useSelector((state) => state.auth);
	const { cart, loading } = useSelector((state) => state.cart);
	const userId = user ? user._id : null;
	const navigate = useNavigate();

	const hasCartItems = useMemo(
		() => cart?.products?.length > 0,
		[cart?.products]
	);

	const handleCheckout = () => {
		toggleDrawer();
		navigate(userId ? "/checkout" : "/login?redirect=checkout");
	};

	useEffect(() => {
		if (userId || guestId) {
			dispatch(fetchCart({ userId, guestId }));
		}
	}, [userId, guestId, dispatch]);
	return (
		<div
			className={`fixed top-0 right-0 flex flex-col w-3/4 sm:w-1/2 lg:w-1/3 h-full bg-white shadow-lg z-50 transition-transform transform ${
				drawerOpen ? "translate-x-0" : "translate-x-full"
			}`}
		>
			<div>
				<button
					onClick={toggleDrawer}
					className="absolute top-2 sm:top-3 right-2 sm:right-3 hover:text-black text-gray-500"
				>
					<MdOutlineCancel className="text-xl sm:text-2xl font-extralight" />
				</button>
			</div>
			<div className="flex flex-col h-full">
				<div className="flex-grow overflow-y-auto">
					<h2 className="text-base sm:text-lg font-semibold text-center mt-3 sm:mt-4">
						Cart
					</h2>
					{loading ? (
						<p className="text-center mt-10">Loading cart...</p>
					) : hasCartItems ? (
						<CartContents cart={cart} userId={userId} guestId={guestId} />
					) : (
						<p className="text-center mt-10">Your cart is empty</p>
					)}
				</div>
				<div className="sticky bottom-0 w-full bg-white p-3 sm:p-4">
					{hasCartItems && (
						<>
							<button
								onClick={handleCheckout}
								className="bg-[#0e0a07] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition w-full mx-auto block mb-1.5 sm:mb-2 text-sm sm:text-base"
							>
								Checkout
							</button>
							<p className="text-[10px] sm:text-xs text-center text-gray-500 tracking-tighter">
								Discounts, Taxes and Shipping rates are calculated on checkout.
							</p>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default CartDrawer;
