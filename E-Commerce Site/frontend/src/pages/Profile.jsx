import MyOrders from "./MyOrders";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Profile = () => {
	const dispatch = useDispatch();
	const handleLogout = () => {
		dispatch(logout());
		window.location.href = "/";
	};

	return (
		<div className="min-h-screen  p-4 md:p-8">
			<div className="max-w-6xl mx-auto">
				<div className="flex flex-col md:flex-row gap-6">
					{/* Profile Card */}
					<div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow">
						<div className="text-center">
							<div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center text-blue-500 text-2xl">
								👤
							</div>
							<h2 className="text-xl font-semibold">Faisal</h2>
							<p className="text-gray-600 mt-3">faisal@example.com</p>
						</div>

						<button
							onClick={handleLogout}
							className="w-full mt-10 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition"
						>
							Logout
						</button>
					</div>

					{/* Orders Section */}

					<MyOrders />
				</div>
			</div>
		</div>
	);
};

export default Profile;
