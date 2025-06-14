import React from 'react';

const Footer = () => {
  const handleContactUs = () => {
    alert('Contact Us button clicked! (Implement your contact form or link)');
    // In a real application, you might navigate to a contact page
    // or open a modal contact form.
  };

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/your_instagram_handle', '_blank'); // Replace with your Instagram URL
  };

  const handleLinkClick = (linkName) => {
    alert(`${linkName} clicked!`);
    // In a real app, you'd navigate to specific pages:
    // e.g., history.push('/terms-of-use');
  };

  return (
    // This footer is now designed to appear at the end of the page content flow.
    // Ensure its parent container (e.g., your App.jsx's main layout) uses
    // flex-col and min-h-screen on the wrapper and flex-grow on content
    // to push this footer to the bottom of the page content.
    <footer
      className="py-4 w-full text-gray-100 text-center z-20 overflow-hidden border-t border-white border-opacity-20"
      style={{
        backgroundImage: 'linear-gradient(to right, #1e3a8a, #7f1d1d, #000000)', // Equivalent to from-blue-900 via-red-900 to-black
        backgroundSize: '200% 200%',
        animation: 'gradient 10s ease infinite',
      }}
    >
      {/* Ensure the gradient animation keyframes are available (if not global, define here) */}
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
      <div className="flex flex-col items-center">
        {/* Links and Instagram Icon */}
        <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-6 text-sm mb-4">
          <button
            onClick={() => handleLinkClick('Terms of Use')}
            className="text-gray-300 hover:text-white hover:underline transition-colors duration-200"
          >
            Terms of Use
          </button>
          <button
            onClick={() => handleLinkClick('Privacy Policy')}
            className="text-gray-300 hover:text-white hover:underline transition-colors duration-200"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => handleLinkClick('Copyright')}
            className="text-gray-300 hover:text-white hover:underline transition-colors duration-200"
          >
            Copyright
          </button>
          {/* Changed from <button> to <div> for clickable image behavior */}
          <div
            onClick={handleInstagramClick}
            className="text-gray-300 hover:text-pink-500 transition-colors duration-200 group cursor-pointer" // Added cursor-pointer
            aria-label="Visit our Instagram"
          >
            {/* Instagram SVG icon path */}
            <svg
              className="w-6 h-6 inline-block group-hover:underline" // Added group-hover:underline for visual effect
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
        <p className="text-sm text-gray-300">Made with Love, By Siddhartha</p>
      </div>
    </footer>
  );
};

export default Footer;
