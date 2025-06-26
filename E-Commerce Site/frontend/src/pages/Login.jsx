import React, { useEffect, useRef, useState } from "react";
import loginImage from "../assets/login.webp";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import { mergeCarts, fetchCart } from "../redux/slices/cartSlice";
import { toast } from "sonner";

const Login = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const { user, guestId } = useSelector((state) => state.auth);
	const userId = user?._id;
	const [loading, setLoading] = useState(false);

	// Parse redirect query
	const redirectPath =
		new URLSearchParams(location.search).get("redirect") || "/";

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const loggedInUser = await dispatch(
				loginUser({
					email: emailRef.current.value,
					password: passwordRef.current.value,
				})
			).unwrap();

			// ✅ Use userId from login response directly
			const newUserId = loggedInUser._id;

			// ✅ Merge carts if guestId exists
			if (guestId) {
				await dispatch(mergeCarts({ guestId }));

				localStorage.removeItem("guestId");

				// ✅ Fetch cart using freshly returned userId
				await dispatch(fetchCart({ userId: newUserId }));
			}

			toast.success("Login successful!");

			// ✅ Navigate
			// console.log(redirectPath);
			navigate("/" + redirectPath);
		} catch (error) {
			console.error("Login error:", error);
			toast.error("Login failed!");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col md:flex-row h-screen">
			<div className="md:w-1/2 flex items-center justify-center bg-white px-8">
				<form onSubmit={handleSubmit} className="max-w-md w-full space-y-6">
					<h2 className="text-2xl font-bold text-gray-800">Login</h2>

					<input
						type="email"
						ref={emailRef}
						placeholder="Email"
						className="w-full px-4 py-2 border rounded-md"
						required
					/>
					<input
						type="password"
						ref={passwordRef}
						placeholder="Password"
						className="w-full px-4 py-2 border rounded-md"
						required
					/>

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-black text-white py-2 rounded-md"
					>
						{loading ? "Logging in..." : "Login"}
					</button>

					<p className="text-sm text-center">
						Don't have an account?{" "}
						<Link
							to={`/signup?redirect=${redirectPath}`}
							className="text-blue-500"
						>
							Sign Up
						</Link>
					</p>
				</form>
			</div>

			{/* Image Section */}
			<div className="hidden md:block md:w-1/2">
				<img
					src={loginImage}
					alt="Login"
					className="w-full h-full object-cover"
				/>
			</div>
		</div>
	);
};

export default Login;
