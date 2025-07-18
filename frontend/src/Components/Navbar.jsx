import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar({ onCartClick }) {

  const navigate = useNavigate();



  const handleLogout = () => {
    localStorage.removeItem('token');
    
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white fixed top-0 left-0 w-full z-50 shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
         
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold">
              🛒 T-Shirt Store
            </Link>
          </div>

        
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="hover:bg-gray-700 px-3 py-2 rounded">
              Home
            </Link>
            <Link
              onClick={onCartClick}
              className="hover:bg-gray-700 px-3 py-2 rounded"
            >
              Cart
            </Link>
            <Link
              to="/wishlist"
              className="hover:bg-gray-700 px-3 py-2 rounded"
            >
              Wishlist
            </Link>
            <Link
              to="/orders"
              className="hover:bg-gray-700 px-3 py-2 rounded"
            >
              Order
            </Link>
          </div>

          <div>
            {localStorage.getItem('token') ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded text-sm"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-300 px-3 py-2 rounded text-sm text-black"
              >
                Login/SignUp
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
