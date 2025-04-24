import React, { useState } from 'react';

const UserManagement = () => {
  const users = [
    {
      _id: 1,
      name: 'John Doe',
      email: "john@example.com",
      role: 'admin',
    },
    {
      _id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'customer',
    }
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add user creation logic here
    console.log('User created:', formData);
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'customer',
    });
  }

  const handleRoleChange = (userId, newRole) => {
    // Update user role logic here
    console.log(`User ID: ${userId}, New Role: ${newRole}`);
  }
  const handleDeleteUser = (userId) => {
    // Delete user logic here
    console.log(`User ID: ${userId} deleted`);
  }

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">User Management</h2>

      <div className="mb-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-semibold mb-6 text-gray-700">Add New User</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter email address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Create password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              id="role"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 transform hover:scale-105"
          >
            Add User
          </button>
        </form>
      </div>
      {/* user list */}
      <div className='overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='min-w-full text-left text-gray-500'>
          <thead className='bg-gray-200 text-xs uppercase text-gray-700'>
            <tr>
              <th scope="col" className='px-6 py-3'>Name</th>
              <th scope="col" className='px-6 py-3'>Email</th>
              <th scope="col" className='px-6 py-3'>Role</th>
              <th scope="col" className='px-6 py-3'>Actions</th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {users.map((user, index) => (
              <tr key={index} className='hover:bg-gray-50'>
                <td className='px-6 py-4'>{user.name}</td>
                <td className='px-6 py-4'>{user.email}</td>
                <td className='px-6 py-4'>
                  <select className='p-2 border rounded' name="role" value={user.role} onChange={(e) => { handleRoleChange(user._id, e.target.value) }}>
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className='px-6 py-4'>
                  <button onClick={() => handleDeleteUser(user._id)} className='bg-red-600 hover:bg-red-800 text-white px-3 py-1 rounded-lg'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;