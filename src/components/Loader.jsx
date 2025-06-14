import React, { useState, useEffect, useRef } from 'react';

const Loader = ({ onLoadComplete }) => {
  const [searchText, setSearchText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);
  const [hoverActive, setHoverActive] = useState(false); // Controls the simulated hover effect
  const [clicked, setClicked] = useState(false); // Controls the simulated click effect
  // Removed: const [showLogo, setShowLogo] = useState(false);
  const searchBarRef = useRef(null);
  // Removed: const logoRef = useRef(null);

  const fullText = "Fitness Redefined"; // The text to be "typed"

  useEffect(() => {
    // 1. Typing animation for the search text
    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex <= fullText.length) {
        if (charIndex < fullText.length) {
          setSearchText(fullText.slice(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setTypingComplete(true); // Signal that typing is complete
        }
      }
    }, 150); // Adjust typing speed here (milliseconds per character)

    // Cleanup interval on component unmount
    return () => clearInterval(typingInterval);
  }, []); // Run once on mount

  useEffect(() => {
    if (typingComplete) {
      // 2. Simulate mouse hover effect on the search bar
      const hoverTimeout = setTimeout(() => {
        setHoverActive(true); // Activate hover state (for visual feedback)
      }, 500); // Delay before hover effect starts

      // 3. Simulate click effect
      const clickTimeout = setTimeout(() => {
        setClicked(true); // Activate clicked state (for visual feedback)

        // 4. Signal loading complete directly after click animation
        const finalLoadTimeout = setTimeout(() => {
          onLoadComplete(); // Call the callback from App.jsx to hide the loader
        }, 800); // Duration for the click animation and loader fade-out

        return () => {
          clearTimeout(finalLoadTimeout);
        };
      }, 1500); // Delay after typing for hover and click sequence to begin

      // Cleanup timeouts if component unmounts prematurely
      return () => {
        clearTimeout(hoverTimeout);
        clearTimeout(clickTimeout);
      };
    }
  }, [typingComplete, onLoadComplete]); // Depend on typingComplete state and onLoadComplete prop

  // Removed: Placeholder for your logo image URL
  // const logoImageUrl = "https://placehold.co/200x200/000000/FFFFFF?text=YOUR+LOGO";

  return (
    // Main loader container: fixed, full screen, high z-index, and fades out when clicked
    // This div now directly holds the gradient background, removing the underlying image
    <div
      className={`fixed inset-0 flex items-center justify-center z-[100] transition-opacity duration-700 ease-in-out
        bg-gradient-to-r from-blue-900 via-red-900 to-black animate-gradient // Moved gradient classes here
        ${clicked ? 'opacity-0' : 'opacity-100'} // Fades out the entire loader when 'clicked' is true
      `}
      style={{
        backgroundSize: '200% 200%', // Required for gradient animation
        animation: 'gradient 10s ease infinite', // Required for gradient animation
      }}
    >
      {/* Keyframes for the gradient animation (can also be in global CSS) */}
      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>


      {/* Google-like Search Bar Container */}
      {/* This content remains visible until 'clicked' becomes true, then the whole loader fades */}
      <div className="relative z-10 w-11/12 max-w-xl p-4">
        <div
          ref={searchBarRef} // Attach ref to the search bar div
          className={`
            relative flex items-center bg-white rounded-full shadow-md p-3 px-6
            transition-all duration-300 ease-in-out
            border border-gray-300
            ${hoverActive ? 'shadow-lg border-blue-500' : ''}
            ${clicked ? 'shadow-xl border-red-500' : ''}
          `}
        >
            {/* Search Icon (Google-like) */}
            <svg className="w-6 h-6 text-gray-500 mr-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            {/* Search Input Simulation Area with Typing Effect */}
            <div
              className="flex-grow h-6 overflow-hidden whitespace-nowrap text-lg font-mono text-gray-800"
              style={{ minWidth: '0' }}
            >
              {searchText}
              {/* Blinking cursor for typing effect */}
              {!typingComplete && (
                <span className="inline-block w-0.5 h-full bg-blue-500 animate-pulse-caret"></span>
              )}
            </div>
            {/* CSS for blinking cursor (could be global in index.css) */}
            <style>
              {`
                @keyframes pulse-caret {
                  0%, 100% { opacity: 1; }
                  50% { opacity: 0; }
                }
                .animate-pulse-caret {
                  animation: pulse-caret 1s infinite step-end;
                }
              `}
            </style>
          </div>
        </div>
      

      {/* Removed: Logo Display Section */}
    </div>
  );
};

export default Loader;
