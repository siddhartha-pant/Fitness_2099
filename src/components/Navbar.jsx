import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
   const navigate=useNavigate();
  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Dummy navigation handler
  const handleNavigation = (section) => {
   navigate(section)
    setIsMenuOpen(false); // Close menu on navigation for mobile
    // In a real app, you'd use React Router or similar for navigation
    // e.g., history.push(`/${section.toLowerCase()}`);
  };

  return (
    <nav
      className="fixed top-0 p-4 flex items-center justify-between border-b border-white border-opacity-20 z-50 overflow-hidden"
      // Apply the same gradient background and animation as your other components
      style={{
        width: '100vw', // Explicitly set to 100% of viewport width
        backgroundImage: 'linear-gradient(to right, #1e3a8a, #7f1d1d, #000000)', // Equivalent to from-blue-900 via-red-900 to-black
        backgroundSize: '200% 200%',
        animation: 'gradient 10s ease infinite',
      }}
    >
      {/* Ensure the gradient animation keyframes are available (e.g., in index.css or tailwind.config.js) */}
      <style>
        {`
          @keyframes gradient {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}
      </style>

      {/* Logo or Brand Name (can be replaced with an actual logo image) */}
      <div className="flex items-center text-white text-2xl font-bold font-mono">
        Fitness 2099
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex space-x-8">
        <button
          onClick={() => handleNavigation('Home')}
          className="text-blue-300 hover:text-blue-100 transition-colors duration-300 text-lg font-semibold"
        >
          Home
        </button>
        <button
          onClick={() => handleNavigation('About')}
          className="text-blue-300 hover:text-blue-100 transition-colors duration-300 text-lg font-semibold"
        >
          About
        </button>
        <button
          onClick={() => handleNavigation(navigate('signIn'))}
          className="text-blue-300 hover:text-blue-100 transition-colors duration-300 text-lg font-semibold"
        >
          Sign In
        </button>
        <button
          onClick={() => handleNavigation('ContactUs')}
          className="text-blue-300 hover:text-blue-100 transition-colors duration-300 text-lg font-semibold"
        >
          About Us
        </button>
        <button
          onClick={() => handleNavigation('FAQ')}
          className="text-blue-300 hover:text-blue-100 transition-colors duration-300 text-lg font-semibold"
        >
          FAQ
        </button>
      </div>

      {/* Hamburger Icon for Mobile */}
      <div className="md:hidden">
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
          className="md:hidden absolute top-full left-0 w-full bg-gray-900 bg-opacity-90 flex flex-col items-center py-4 space-y-4 shadow-lg animate-fade-in z-[60]" // Increased z-index to z-[60]
          style={{
            animation: 'fadeIn 0.3s ease-out forwards', // Apply fadeIn animation
          }}
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
            onClick={() => handleNavigation('Home')}
            className="block text-blue-300 hover:text-blue-100 transition-colors duration-300 text-xl font-semibold w-full py-2 text-center"
          >
            Home
          </button>
          <button
            onClick={() => handleNavigation('About')}
            className="block text-blue-300 hover:text-blue-100 transition-colors duration-300 text-xl font-semibold w-full py-2 text-center"
          >
            About
          </button>
          <button
            onClick={() => handleNavigation('SignIn')}
            className="block text-blue-300 hover:text-blue-100 transition-colors duration-300 text-xl font-semibold w-full py-2 text-center"
          >
            Sign In
          </button>
          <button
            onClick={() => handleNavigation('ContactUs')}
            className="block text-blue-300 hover:text-blue-100 transition-colors duration-300 text-xl font-semibold w-full py-2 text-center"
          >
           About Us
          </button>
          <button
            onClick={() => handleNavigation('FAQ')}
            className="block text-blue-300 hover:text-blue-100 transition-colors duration-300 text-xl font-semibold w-full py-2 text-center"
          >
            FAQ
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
