import React, { useState, useEffect, useRef } from 'react';

const Loader = ({ onLoadComplete }) => {
  const [searchText, setSearchText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);
  const [hoverActive, setHoverActive] = useState(false); // Controls the simulated hover effect
  const [clicked, setClicked] = useState(false); // Controls the simulated click effect
  const [showTitle, setShowTitle] = useState(false); // New state for displaying "Fitness 2099" text
  const searchBarRef = useRef(null);

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
    }, 70); // Significantly faster typing speed

    // Cleanup interval on component unmount
    return () => clearInterval(typingInterval);
  }, []); // Run once on mount

  useEffect(() => {
    if (typingComplete) {
      // 2. Simulate mouse hover effect on the search bar
      const hoverTimeout = setTimeout(() => {
        setHoverActive(true); // Activate hover state (for visual feedback)
      }, 200); // Reduced delay for hover

      // 3. Simulate click effect and start loader fade-out
      const clickTimeout = setTimeout(() => {
        setClicked(true); // This starts the main loader's opacity-0 transition
        setShowTitle(true); // Immediately show and animate the "Fitness 2099" text

        // 4. Signal loading complete after the loader has fully faded out
        // This timeout matches the transition duration of the loader itself for immediate handover
        const finalLoadTimeout = setTimeout(() => {
          onLoadComplete(); // Call the callback from App.jsx to hide the loader
        }, 500); // Matches the loader's fade-out transition duration

        return () => {
          clearTimeout(finalLoadTimeout);
        };
      }, 500); // Reduced delay for click (happens shortly after hover)

      // Cleanup timeouts if component unmounts prematurely
      return () => {
        clearTimeout(hoverTimeout);
        clearTimeout(clickTimeout);
      };
    }
  }, [typingComplete, onLoadComplete]); // Depend on typingComplete state and onLoadComplete prop

  return (
    // Main loader container: fixed, full screen, high z-index, and fades out when 'clicked'
    // Increased fade out duration for smoothness
    <div
      className={`fixed inset-0 flex items-center justify-center z-[100] transition-opacity duration-500 ease-in-out // Faster fade out duration
        bg-gradient-to-r from-blue-900 via-red-900 to-black animate-gradient animate-pulse-subtle
        ${clicked ? 'opacity-0' : 'opacity-100'}
      `}
      style={{
        backgroundSize: '200% 200%',
        animation: 'gradient 10s ease infinite',
      }}
    >
      {/* Keyframes for animations */}
      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes pulse-caret {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          .animate-pulse-caret {
            animation: pulse-caret 1s infinite step-end;
          }
          @keyframes pulse-subtle {
            0% { transform: scale(1); }
            50% { transform: scale(1.005); }
            100% { transform: scale(1); }
          }
          .animate-pulse-subtle {
            animation: pulse-subtle 4s infinite ease-in-out; /* Longer, gentler pulse */
          }
          @keyframes radiate-pulse {
            0% { transform: scale(0.1); opacity: 0; }
            30% { opacity: 0.4; } /* Increased max opacity for more presence */
            100% { transform: scale(1.5); opacity: 0; }
          }
          /* Faster radiate-pulse animation */
          .animate-radiate-1 { animation: radiate-pulse 1.5s infinite ease-out; }
          .animate-radiate-2 { animation: radiate-pulse 1.5s infinite ease-out 0.2s; }
          .animate-radiate-3 { animation: radiate-pulse 1.5s infinite ease-out 0.4s; }

          @keyframes text-reveal {
            0% { opacity: 0; transform: translateY(20px) scale(0.8); filter: blur(8px); }
            10% { opacity: 0.1; }
            100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0px); }
          }
          /* Removed flicker animation for a cleaner reveal */
        `}
      </style>

      {/* Radiating Circles - Aesthetic Elements */}
      {/* These will appear behind the search bar/title but within the loader's gradient */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-2/3 h-2/3 border-2 border-blue-400 rounded-full animate-radiate-1"></div>
        <div className="absolute w-2/3 h-2/3 border-2 border-red-500 rounded-full animate-radiate-2"></div>
        <div className="absolute w-2/3 h-2/3 border-2 border-gray-400 rounded-full animate-radiate-3"></div>
      </div>

      {/* Conditional rendering for Search Bar or "Fitness 2099" Title */}
      {!clicked && ( // Show search bar until 'clicked' becomes true
        <div className="relative z-10 w-11/12 max-w-xl p-4">
          <div
            ref={searchBarRef}
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
          </div>
        </div>
      )}

      {/* "Fitness 2099" Title Displayed During Fade-Out */}
      {clicked && showTitle && ( // Show title only when 'clicked' is true AND 'showTitle' is true
        <div
          className={`
            absolute flex items-center justify-center w-full h-full text-center
            animate-text-reveal // Apply new text reveal animation
          `}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-blue-400" // Flicker class removed for direct reveal
              style={{
                textShadow: '0 0 10px rgba(66, 153, 225, 0.7), 0 0 20px rgba(66, 153, 225, 0.5), 0 0 30px rgba(66, 153, 225, 0.3)' // Adding a glow effect
              }}>
            Fitness 2099
          </h1>
        </div>
      )}
    </div>
  );
};

export default Loader;
