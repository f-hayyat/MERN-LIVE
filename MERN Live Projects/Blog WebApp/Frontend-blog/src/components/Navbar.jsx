import React from 'react'
import {Link} from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold text-white">
          <Link to='/'>Blog App</Link>
        </div>
        <div className="space-x-4">
          <Link to='/' className="text-gray-300 hover:text-white transition duration-300">
            Home
          </Link>
          <Link to='/create-blog' className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300">
            Create Blog
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
