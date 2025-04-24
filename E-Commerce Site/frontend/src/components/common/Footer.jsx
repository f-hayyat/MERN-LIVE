import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t py-10 bg-gray-100 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-6 lg:px-0">
        {/* Newsletter Section */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-gray-800">Newsletter</h3>
          <p className="text-sm text-gray-700">
            Be the first to hear about new products, exclusive events, and discounts.
          </p>
          <p className="text-xs text-gray-600">
            Sign up and get 10% off your first order.
          </p>
          <form className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-300 rounded-md p-2 w-full transition-all focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <button className="bg-gray-800 hover:bg-black text-white rounded-md px-4 py-2 mt-2 transition-all">
              Subscribe
            </button>
          </form>
        </div>

        {/* Shop Links */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-gray-800">Shop</h3>
          <ul className="text-sm text-gray-700 flex flex-col gap-2">
            {["Men's Top Wear", "Women's Top Wear", "Men's Bottom Wear", "Women's Bottom Wear"].map((item, index) => (
              <li key={index} className="hover:text-gray-900 transition-all cursor-pointer">
                <Link to={`/${item.toLowerCase().replace(/\s/g, "-")}`}>{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support Links */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-gray-800">Support</h3>
          <ul className="text-sm text-gray-700 flex flex-col gap-2">
            {["Contact Us", "About Us", "FAQ's", "Features"].map((item, index) => (
              <li key={index} className="hover:text-gray-900 transition-all cursor-pointer">
                <Link to="#">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media Links with Icons */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-gray-800">Follow Us</h3>
          <ul className="text-sm text-gray-700 flex flex-col gap-3">
            {[
              { name: "Facebook", icon: <FaFacebookF />, link: "#" },
              { name: "Instagram", icon: <FaInstagram />, link: "#" },
              { name: "Twitter", icon: <FaTwitter />, link: "#" },
              { name: "LinkedIn", icon: <FaLinkedinIn />, link: "#" },
            ].map((social, index) => (
              <li key={index} className="flex items-center gap-2 hover:text-gray-900 transition-all cursor-pointer">
                <Link to={social.link} className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
                  <span className="text-lg">{social.icon}</span>
                  {social.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="text-center mt-10 text-sm text-gray-600 border-t pt-5">
        <p className="mb-2">
          <Link to="#" className="hover:text-gray-900 transition-all">Terms of Service</Link> | 
          <Link to="#" className="hover:text-gray-900 transition-all"> Privacy Policy</Link>
        </p>
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        <p className="text-xs text-gray-400">Built with ❤️ by Your Name</p>
      </div>
    </footer>
  );
};

export default Footer;
