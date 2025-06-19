import React from 'react';
import { useTheme } from '../context/ThemeContext'; // Import useTheme hook

const Footer = () => {
  const { theme } = useTheme(); // Use theme from context

  const handleContactUs = () => {
    alert('Contact Us button clicked! (Implement your contact form or link)');
  };

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/your_instagram_handle', '_blank'); // Replace with your Instagram URL
  };

  const handleLinkClick = (linkName) => {
    alert(`${linkName} clicked!`);
  };

  return (
    <footer
      className="py-4 w-full text-center z-20 overflow-hidden border-t border-opacity-20 transition-colors duration-500"
      style={{
        backgroundImage: theme === 'dark'
          ? 'linear-gradient(to right, #1e3a8a, #7f1d1d, #000000)' // Dark mode gradient
          : 'linear-gradient(to right, #b57ef5, #FFFFFF, #f3f360)', // Light mode gradient
        backgroundSize: '200% 200%',
        animation: 'gradient 6.50s ease infinite',
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
      <div className="flex flex-col items-center">
        {/* Links and Instagram Icon */}
        <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-6 text-sm mb-4">
          <button
            onClick={() => handleLinkClick('Terms of Use')}
            className={`text-sm hover:underline transition-colors duration-200
                        ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`} 
          >
            Terms of Use
          </button>
          <button
            onClick={() => handleLinkClick('Privacy Policy')}
            className={`text-sm hover:underline transition-colors duration-200
                        ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`} 
          >
            Privacy Policy
          </button>
          <button
            onClick={() => handleLinkClick('Copyright')}
            className={`text-sm hover:underline transition-colors duration-200
                        ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`} 
          >
            Copyright
          </button>
          <div
            onClick={handleInstagramClick}
            className={`cursor-pointer group transition-colors duration-200
                        ${theme === 'dark' ? 'text-gray-300 hover:text-pink-500' : 'text-gray-700 hover:text-pink-600'}`}
            aria-label="Visit our Instagram"
          >
            <svg
              className="w-6 h-6 inline-block group-hover:underline"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4c0 3.2-2.6 5.8-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2zm-.2 2.2V4c-2.4 0-3.8.4-4.6 1.2S2 7 2 7.8v8.4c0 .8.2 2.2 1.2 3s2.2 1.2 3 1.2h8.4c.8 0 2.2-.2 3-1.2s1.2-3 1.2-3V7.8c0-.8-.2-2.2-1.2-3s-2.2-1.2-3-1.2h-8.4zm.5 4.3a.9.9 0 100 1.8.9.9 0 000-1.8zM12 9a6 6 0 100 12 6 6 0 000-12zm0 2a4 4 0 110 8 4 4 0 010-8zm0 2a2 2 0 100 4 2 2 0 000-4z"
              />
            </svg>
          </div>
        </div>

        {/* Copyright Text */}
        <p className={`text-sm transition-colors duration-500
                       ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}> {/* Changed to gray-700 for light mode */}
          Made with Love, By Siddhartha
        </p>
      </div>
    </footer>
  );
};

export default Footer;
