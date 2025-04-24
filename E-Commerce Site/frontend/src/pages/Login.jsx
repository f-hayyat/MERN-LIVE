import React, { useEffect, useRef, useState } from "react";
import loginImage from "../assets/login.webp";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import { mergeCarts } from "../redux/slices/cartSlice";

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { user, guestId } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);
    const [isMerging, setIsMerging] = useState(false);
    
    const searchParams = new URLSearchParams(location.search);
    const redirect = searchParams.get("redirect");

    useEffect(() => {
        // Only run this effect when user changes from null to logged in
        if (user && !isMerging) {
            const redirectTo = redirect === "checkout" ? "/checkout" : "/";
            
            if (guestId && cart?.products?.length > 0) {
                setIsMerging(true);
                dispatch(mergeCarts({ guestId }))
                    .unwrap()
                    .then(() => {
                        navigate(redirectTo);
                    })
                    .catch((error) => {
                        console.error("Cart merge failed:", error);
                        navigate(redirectTo);
                    });
            } else {
                navigate(redirectTo);
            }
        }
    }, [user, guestId, redirect, dispatch, navigate, isMerging]);

    const handleLogin = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        dispatch(loginUser({ email, password }))
            .unwrap()
            .catch((error) => {
                console.error("Login failed:", error);
                // You might want to show this error to the user
            });
    };

    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <div className="flex w-full max-w-4xl rounded-lg shadow-lg md:flex-row flex-col py-4 bg-white">
                {/* Left Side - Login Form */}
                <div className="flex w-full flex-col justify-center p-8 md:w-1/2">
                    <h2 className="text-center text-2xl font-bold text-gray-800">Rabbit</h2>
                    <h2 className="mt-4 text-center text-3xl font-bold text-gray-900">
                        Hi there 👋
                    </h2>
                    <p className="mt-2 text-center text-gray-600">
                        Welcome back! Please enter your details to login.
                    </p>

                    <form onSubmit={handleLogin} className="mt-6 space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-gray-700">
                                Email
                            </label>
                            <input
                                ref={emailRef}
                                type="email"
                                placeholder="Enter your email"
                                id="email"
                                className="mt-1 w-full rounded-md border border-gray-300 p-3 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-700"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-gray-700">
                                Password
                            </label>
                            <input
                                ref={passwordRef}
                                type="password"
                                placeholder="Enter your password"
                                id="password"
                                className="mt-1 w-full rounded-md border border-gray-300 p-3 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-700"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full rounded-md bg-gray-800 py-3 text-white transition-all hover:bg-gray-900"
                        >
                            Login
                        </button>
                    </form>
                    <p className="mt-4 text-center text-sm text-gray-600">
                        Don't have an account?
                        <Link
                            to={`/signup?redirect=${encodeURIComponent(redirect || "")}`}
                            className="ml-1 font-medium text-blue-500 hover:underline"
                        >
                            Register here
                        </Link>
                    </p>
                </div>

                {/* Right Side - Image (Hidden on small screens) */}
                <div className="hidden md:flex w-1/2 items-center justify-center">
                    <img
                        src={loginImage}
                        alt="Login"
                        className="w-auto h-auto max-w-xs rounded-lg shadow-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;