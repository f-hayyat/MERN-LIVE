import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import AdminSidebar from './AdminSidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* Mobile Header - Fixed to top and full width */}
      <div className="md:hidden flex items-center p-4 bg-gray-800 text-white fixed top-0 left-0 right-0 h-16 shadow-md z-30">
        <button onClick={toggleSidebar}>
          <FaBars size={24} />
        </button>
        <h1 className="ml-4 text-xl font-semibold">Admin Panel</h1>
      </div>

      {/* Overlay for mobile sidebar - Fixed with proper opacity */}
      {isSidebarOpen && (
        <div 
          onClick={toggleSidebar} 
          className="md:hidden fixed inset-0 bg-black/50 z-20"
        ></div>
      )}

      {/* Sidebar */}
      <div className={`w-64 bg-gray-800 min-h-screen text-white fixed md:relative transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 z-20`}>
        <AdminSidebar/>
      </div>

      {/* Main Content - Adjusted for mobile header */}
      <div className="flex-1 p-6 mt-16 md:mt-0">
        <Outlet/>
      </div>
    </div>
  );
};

export default AdminLayout;