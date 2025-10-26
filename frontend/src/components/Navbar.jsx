import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="text-center text-red-800 bg-amber-300">currently the project may not work as expected but you can <Link to="https://github.com/sachinpoudel/A-Full-Stack-Blog-App"><span className="font-bold text-blue">try</span></Link> it at your local machine</div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <svg
                className="h-8 w-8 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
              <span className="ml-2 text-xl font-bold text-gray-800">
                BlogHub
              </span>
            </Link>

            {/* Always visible Home link in mobile */}
            <Link
              to="/"
              className="ml-4 md:hidden px-3 py-2 text-gray-700 text-sm font-medium hover:text-indigo-600 transition"
            >
              Home
            </Link>
          </div>

          {/* Desktop navigation links */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              to="/"
              className="px-3 py-2 text-gray-700 text-sm font-medium hover:text-indigo-600 transition"
            >
              Home
            </Link>
            <Link
              to="/blogs"
              className="px-3 py-2 text-gray-700 text-sm font-medium hover:text-indigo-600 transition"
            >
              Blogs
            </Link>
            <Link
              to="/about"
              className="px-3 py-2 text-gray-700 text-sm font-medium hover:text-indigo-600 transition"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="px-3 py-2 text-gray-700 text-sm font-medium hover:text-indigo-600 transition"
            >
              Contact
            </Link>
          </div>

          {/* Desktop auth buttons */}
          {user ? (
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={logout}
                className="w-full bg-blue-600 text-white py-2 px-4 items-center rounded hover:bg-blue-700 transition"
              >
                Logout
              </button>
              <Link
                to="/dashboard"
                className="text-gray-700 text-sm font-medium hover:text-indigo-600 transition"
              >
                Dashboard
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 text-sm font-medium hover:text-indigo-600 transition"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition"
              >
                Sign up
              </Link>
            </div>
          )}

          {/* Mobile always-visible auth button */}
          <div className="flex items-center">
            {user ? (
              <button
                onClick={logout}
                className="md:hidden mr-2 bg-blue-600 text-white py-1 px-3 text-sm rounded hover:bg-blue-700 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/signup"
                className="md:hidden mr-2 py-1 px-3 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition"
              >
                Sign up
              </Link>
            )}

            {/* Hamburger menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex md:hidden items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden bg-white border-t border-gray-200 pt-2 pb-3`}
      >
        <div className="px-2 space-y-1">
          {/* Navigation links - removed Home since it's now always visible */}
          <Link
            to="/blogs"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Blogs
          </Link>
          <Link
            to="/about"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
        </div>

        {/* Authentication section - added Login and Dashboard here */}
        <div className="pt-4 pb-3 border-t border-gray-200">
          {user ? (
            <div className="space-y-1">
              <Link
                to="/dashboard"
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            </div>
          ) : (
            <div className="space-y-1">
              <Link
                to="/login"
                className="block w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Log in
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
