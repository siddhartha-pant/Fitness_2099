import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext"; // Import useTheme hook
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme(); // Use theme and toggleTheme from context
  const isUserAuthenticated = useSelector(
    (store) => store.auth.isAuthenticated
  );
  console.log(isUserAuthenticated);

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Navigation handler now uses useNavigate
  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false); // Close menu on navigation for mobile
  };

  return (
    <nav
      className="fixed top-0 p-4 flex items-center justify-between z-50 overflow-hidden"
      // Apply gradient based on theme
      style={{
        width: "100vw",
        backgroundImage:
          theme === "dark"
            ? "linear-gradient(to right, #1e3a8a, #7f1d1d, #000000)" // Dark mode gradient
            : "linear-gradient(to right, #D8BFD8, #FFFFFF, #FFFFE0)", // Light mode gradient: Slightly Darker Purple, White, Very Light Yellow
        backgroundSize: "200% 200%",
        animation: "gradient 10s ease infinite",
      }}
    >
      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          } 
        `}
      </style>

      {/* Logo or Brand Name (clickable Link to Home) */}
      <Link
        to="/"
        className={`flex items-center text-2xl font-bold font-mono transition-colors duration-300
        ${
          theme === "dark"
            ? "text-white hover:text-blue-300"
            : "text-black hover:text-red-700"
        }`}
      >
        Fitness 2099
      </Link>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex space-x-8 items-center">
        <Link
          to="/"
          className={`text-lg font-semibold transition-colors duration-300
          ${
            theme === "dark"
              ? "text-blue-300 hover:text-blue-100"
              : "text-blue-800 hover:text-red-700"
          }`}
        >
          Home
        </Link>
        <Link
          to="/about"
          className={`text-lg font-semibold transition-colors duration-300
          ${
            theme === "dark"
              ? "text-blue-300 hover:text-blue-100"
              : "text-blue-800 hover:text-red-700"
          }`}
        >
          About
        </Link>
       {isUserAuthenticated?<Link
          to="/home"
          className={`text-lg font-semibold transition-colors duration-300
        ${
          theme === "dark"
            ? "text-blue-300 hover:text-blue-100"
            : "text-red-700 hover:text-blue-800"
        }`}
        >
          Logout
        </Link>: <Link
          to="/signin"
          className={`text-lg font-semibold transition-colors duration-300
        ${
          theme === "dark"
            ? "text-blue-300 hover:text-blue-100"
            : "text-red-700 hover:text-blue-800"
        }`}
        >
          Sign In
        </Link>}
        <Link
          to="/contact-us"
          className={`text-lg font-semibold transition-colors duration-300
          ${
            theme === "dark"
              ? "text-blue-300 hover:text-blue-100"
              : "text-blue-800 hover:text-red-700"
          }`}
        >
          Contact Us
        </Link>
        <Link
          to="/faq"
          className={`text-lg font-semibold transition-colors duration-300
          ${
            theme === "dark"
              ? "text-blue-300 hover:text-blue-100"
              : "text-blue-800 hover:text-red-700"
          }`}
        >
          FAQ
        </Link>

        {/* Theme Toggle Button for Desktop - Styled like a light switch */}
        <button
          onClick={toggleTheme}
          className={`ml-6 relative flex items-center w-32 h-10 rounded-full shadow-lg overflow-hidden
                     transition-all duration-500 ease-in-out font-bold text-sm
                     ${
                       theme === "dark"
                         ? "bg-blue-800 text-white" // Night mode background
                         : "bg-orange-500 text-white" // Day mode background (using orange for warm feel)
                     }`}
          aria-label="Toggle light/dark mode"
        >
          {/* Movable circle (thumb) */}
          <span
            className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md z-10
                        transition-all duration-500 ease-in-out
                        ${
                          theme === "dark" ? "left-[calc(100%-36px)]" : "left-1"
                        }`}
          ></span>

          {/* Text and Icon for LIGHT mode */}
          <span
            className={`absolute right-2 h-full flex items-center justify-end
                        transition-opacity duration-500 ease-in-out
                        ${theme === "dark" ? "opacity-0" : "opacity-100"}`}
          >
            LIGHT
            <span className="ml-1 flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellow-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h1M4 12H3m15.325 5.325l-.707.707M6.364 6.364l-.707-.707m12.728 0l-.707.707M6.364 17.636l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </span>
          </span>

          {/* Text and Icon for DARK mode */}
          <span
            className={`absolute left-2 h-full flex items-center justify-start
                        transition-opacity duration-500 ease-in-out
                        ${theme === "dark" ? "opacity-100" : "opacity-0"}`}
          >
            DARK
            <span className="ml-1 flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </span>
          </span>
        </button>
      </div>

      {/* Hamburger Icon for Mobile */}
      <div className="md:hidden flex items-center">
        {/* Theme Toggle Button for Mobile (inside hamburger area) - Simplified for mobile compact view */}
        <button
          onClick={toggleTheme}
          className="mr-4 p-2 rounded-full bg-gray-700 text-white shadow-lg hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Toggle light/dark mode"
        >
          {theme === "dark" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-yellow-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h1M4 12H3m15.325 5.325l-.707.707M6.364 6.364l-.707-.707m12.728 0l-.707.707M6.364 17.636l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </button>

        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none cursor-pointer"
          aria-label="Toggle menu"
        >
          {/* Hamburger SVG icon */}
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12" // X icon
              ></path>
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" // Hamburger icon
              ></path>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay (the dropdown menu) */}
      {isMenuOpen && (
        <div
          className={`md:hidden absolute top-full left-0 w-full flex flex-col items-center py-4 space-y-4 shadow-lg animate-fade-in z-[60] transition-colors duration-500
            ${
              theme === "dark"
                ? "bg-gray-900 bg-opacity-90"
                : "bg-gray-100 bg-opacity-90"
            }`}
          style={{ animation: "fadeIn 0.3s ease-out forwards" }}
        >
          <style>
            {`
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}
          </style>
          <button
            onClick={() => handleNavigation("/")}
            className={`block text-xl font-semibold w-full py-2 text-center transition-colors duration-300
              ${
                theme === "dark"
                  ? "text-blue-300 hover:text-blue-100"
                  : "text-blue-800 hover:text-red-700"
              }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavigation("/about")}
            className={`block text-xl font-semibold w-full py-2 text-center transition-colors duration-300
              ${
                theme === "dark"
                  ? "text-blue-300 hover:text-blue-100"
                  : "text-blue-800 hover:text-red-700"
              }`}
          >
            About
          </button>
          <button
            onClick={() => handleNavigation("/signin")}
            className={`block text-xl font-semibold w-full py-2 text-center transition-colors duration-300
              ${
                theme === "dark"
                  ? "text-blue-300 hover:text-blue-100"
                  : "text-red-700 hover:text-blue-800"
              }`}
          >
            Sign In
          </button>
          <button
            onClick={() => handleNavigation("/contact-us")}
            className={`block text-xl font-semibold w-full py-2 text-center transition-colors duration-300
              ${
                theme === "dark"
                  ? "text-blue-300 hover:text-blue-100"
                  : "text-blue-800 hover:text-red-700"
              }`}
          >
            Contact Us
          </button>
          <button
            onClick={() => handleNavigation("/faq")}
            className={`block text-xl font-semibold w-full py-2 text-center transition-colors duration-300
              ${
                theme === "dark"
                  ? "text-blue-300 hover:text-blue-100"
                  : "text-blue-800 hover:text-red-700"
              }`}
          >
            FAQ
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
