import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBox, FaShoppingCart, FaSignOutAlt, FaStore, FaUsers } from 'react-icons/fa';

const AdminSidebar = ({ toggleSidebar }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className='p-6'>
            <div className='mb-6 mt-20 md:mt-0 flex items-center'>
                <Link to="/admin" className="text-2xl font-medium">Rabbit</Link>
            </div>
            <h2 className='text-xl font-medium mb-6 text-center'>Admin Dashboard</h2>
            <nav className='flex flex-col space-y-2'>
                <NavLink to="/admin/users" className={({ isActive }) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
                    <FaUsers />
                    <span>Users</span>
                </NavLink>
                <NavLink to="/admin/products" className={({ isActive }) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
                    <FaBox />
                    <span>Products</span>
                </NavLink>
                <NavLink to="/admin/orders" className={({ isActive }) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
                    <FaShoppingCart />
                    <span>Orders</span>
                </NavLink>
                <NavLink to="/" className={({ isActive }) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
                    <FaStore />
                    <span>Shop</span>
                </NavLink>
            </nav>

            <button onClick={handleLogout} className='w-full bg-red-500 hover:bg-red-700 cursor-pointer text-white rounded-lg mt-6 px-4 py-2'>
                <FaSignOutAlt className="inline mr-2" /> Logout
            </button>
        </div>
    );
};

export default AdminSidebar;
