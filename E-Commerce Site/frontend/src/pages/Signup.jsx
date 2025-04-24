import React, { useRef } from "react";
import signupImage from "../assets/register.webp";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";

const Signup = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const dispatch = useDispatch();
    // Handle signup function
    const handleSignup = (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        // Perform login logic here
        const userData = { name, email, password };
        dispatch(registerUser(userData))
            .unwrap()
            .then(() => {
                // Redirect or show success message
                console.log("Signup successful");
            })
            .catch((error) => {
                // Handle error (e.g., show error message)
                console.error("Signup failed:", error);
            });
    };
    return (
        <div className="flex min-h-screen items-center justify-center px-6 py-10">
            <div className="flex w-full max-w-4xl  rounded-lg shadow-lg md:flex-row flex-col py-4 bg-white">
                {/* Left Side - Login Form */}
                <div className="flex w-full flex-col justify-center p-8 md:w-1/2">
                    <h2 className="text-center text-2xl font-bold text-gray-800">Rabbit</h2>
                    <h2 className="mt-4 text-center text-3xl font-bold text-gray-900">Hi there 👋</h2>
                    <p className="mt-2 text-center text-gray-600">
                        Welcome! Please enter your details to create an account.
                    </p>

                    <form onSubmit={handleSignup} className="mt-6 space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-gray-700">
                               Full Name
                            </label>
                            <input
                                ref={nameRef}
                                type="text"
                                placeholder="Enter your full name"
                                id="name"
                                className="mt-1 w-full rounded-md border border-gray-300 p-3 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-700"
                                required
                            />
                        </div>
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
                            Signup
                        </button>
                    </form>
                    <p className="mt-4 text-center text-sm text-gray-600">
                        Already have an account?
                        <Link to="/login" className="ml-1 font-medium text-blue-500 hover:underline">
                            Login here
                        </Link>
                    </p>
                </div>

                {/* Right Side - Image (Hidden on small screens) */}
                <div className="hidden md:flex w-1/2 items-center justify-center mr-5 ">
                    <img
                        src={signupImage}
                        alt="Login"
                        className="w-auto h-auto md:max-w-sm  lg:max-w-md  rounded-lg shadow-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default Signup;