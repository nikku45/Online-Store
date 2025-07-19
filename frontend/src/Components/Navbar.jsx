import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Navbar({ onCartClick }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-gray-800 text-white fixed top-0 left-0 w-full z-50 shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold" onClick={closeMenu}>
              🛒 T-Shirt Store
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="hover:bg-gray-700 px-3 py-2 rounded">
              Home
            </Link>
            <Link onClick={onCartClick} className="hover:bg-gray-700 px-3 py-2 rounded">
              Cart
            </Link>
            <Link to="/wishlist" className="hover:bg-gray-700 px-3 py-2 rounded">
              Wishlist
            </Link>
            <Link to="/orders" className="hover:bg-gray-700 px-3 py-2 rounded">
              Orders
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:block">
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

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              {menuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-700 space-y-1 px-2 pb-3 pt-2">
          <Link
            to="/"
            onClick={closeMenu}
            className="block hover:bg-gray-600 px-3 py-2 rounded"
          >
            Home
          </Link>
          <Link
            onClick={() => {
              onCartClick();
              closeMenu();
            }}
            className="block hover:bg-gray-600 px-3 py-2 rounded"
          >
            Cart
          </Link>
          <Link
            to="/wishlist"
            onClick={closeMenu}
            className="block hover:bg-gray-600 px-3 py-2 rounded"
          >
            Wishlist
          </Link>
          <Link
            to="/orders"
            onClick={closeMenu}
            className="block hover:bg-gray-600 px-3 py-2 rounded"
          >
            Orders
          </Link>

          {localStorage.getItem('token') ? (
            <button
              onClick={() => {
                handleLogout();
                closeMenu();
              }}
              className="w-full text-left bg-red-500 hover:bg-red-600 px-3 py-2 rounded text-sm mt-2"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={closeMenu}
              className="block bg-blue-500 hover:bg-blue-300 px-3 py-2 rounded text-sm text-black mt-2"
            >
              Login/SignUp
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
