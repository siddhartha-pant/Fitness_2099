import React, { useState, useEffect, useRef } from 'react'; // Import useRef
import { useTheme } from '../context/ThemeContext'; // Import useTheme hook

const LandingPage = () => {
  // This state isn't used for the current design but is kept from the original
  const [currentSlide, setCurrentSlide] = useState(0);
  const { theme } = useTheme(); // Use theme from context

  // Background image URL - set to empty string to remove placeholder text.
  // The dynamic gradient will now be the sole background.
  const backgroundImage = ""; // Removed the URL to display only the gradient

  // This carouselImages array is not used in the current design (no carousel on landing page)
  const carouselImages = [
    "https://placehold.co/1200x600/1e3a8a/FFFFFF?text=Strength",
    "https://placehold.co/1200x600/7f1d1d/FFFFFF?text=Endurance",
    "https://placehold.co/1200x600/000000/FFFFFF?text=Mindfulness",
    "https://placehold.co/1200x600/3B82F6/FFFFFF?text=Flexibility"
  ];

  // Effect for automatic slide change (not currently used with fixed content, but kept for future carousel features)
  useEffect(() => {
    const interval = setInterval(() => {
      // setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselImages.length]);


  // Dummy navigation handlers - these should be replaced with react-router-dom useNavigate
  const handleSignIn = () => {
    alert('Sign In button clicked! (Navigate to login page)');
    // Example: navigate('/signin');
  };

  const handleSignUp = () => {
    alert('Sign Up button clicked! (Navigate to signup page)');
    // Example: navigate('/signup');
  };

  // Ref for the info section to observe its visibility (renamed from featuresRef for clarity)
  const infoRef = useRef(null);
  // State to control the visibility/animation of the info section
  const [infoVisible, setInfoVisible] = useState(false);

  // Effect for Intersection Observer to trigger the animation
  useEffect(() => {
    const currentRef = infoRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInfoVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div className="relative h-auto min-h-screen w-screen flex flex-col items-center justify-start p-0 overflow-hidden">
      {/* Layer 1: Background Image (conditionally rendered if imageUrl is not empty) */}
      {/* This div will effectively not render any image because backgroundImage is empty */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>
      )}

      {/* Layer 2: Gradient Overlay (dynamic based on theme) */}
      <div
        className={`absolute inset-0 animate-gradient opacity-70`}
        style={{
          backgroundImage: theme === 'dark'
            ? 'linear-gradient(to right, #1e3a8a, #7f1d1d, #000000)' // Dark mode gradient
            : 'linear-gradient(to right, #b57ef5, #FFFFFF, #f3f360)', // Light mode gradient: Slightly Darker Purple, White, Very Light Yellow
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
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full min-h-[calc(100vh-80px)] px-4 py-8 md:py-16"> {/* Adjust min-h based on Navbar/Footer height */}

        {/* Hero Section */}
        <section className={`text-center py-16 md:py-24 max-w-4xl mx-auto transition-colors duration-500
                           ${theme === 'dark' ? 'text-white' : 'text-black'}`}> {/* Text color adjusted for light mode */}
          <h1 className={`text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-lg transition-colors duration-500
                          ${theme === 'dark' ? 'text-blue-400' : 'text-blue-800'}`}> {/* Deep blue for light mode */}
            Unleash Your Future Self
          </h1>
          <p className={`text-xl md:text-2xl mb-8 leading-relaxed px-4 transition-colors duration-500
                         ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}> {/* Darker gray for light mode */}
            Step into Fitness 2099 – where cutting-edge technology meets personalized wellness.
            Your journey to peak performance and holistic well-being starts here, today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <button
              onClick={handleSignUp}
              className={`font-bold py-3 px-8 rounded-full text-lg shadow-lg
                         transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4
                         ${theme === 'dark' ? 'bg-red-700 hover:bg-red-800 text-white focus:ring-red-500' : 'bg-red-700 hover:bg-red-800 text-white focus:ring-red-500'}`} 
            >
              Start Your Journey
            </button>
            <button
              onClick={handleSignIn}
              className={`border-2 font-bold py-3 px-8 rounded-full text-lg shadow-lg
                         transition duration-300 ease-in-out transform hover:scale-105
                         focus:outline-none focus:ring-4
                         ${theme === 'dark'
                           ? 'bg-transparent border-blue-500 text-blue-300 hover:bg-blue-900 hover:border-blue-900 focus:ring-blue-500'
                           : 'bg-transparent border-blue-800 text-blue-800 hover:bg-blue-100 hover:border-blue-100 focus:ring-blue-800' // Deep Blue for light mode border and text
                         }`}
            >
              Already a Member? Sign In
            </button>
          </div>
        </section>

        {/* Feature Section with scroll-triggered animation */}
        <section ref={infoRef} className="w-full py-16 px-4">
          <h2 className={`text-4xl font-bold text-center mb-12 drop-shadow-md transition-colors duration-500
                          ${theme === 'dark' ? 'text-blue-500' : 'text-blue-800'}`}> {/* Deep blue for light mode */}
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature Card 1 */}
            <div className={`
                p-8 rounded-xl shadow-xl border-2 text-center
                transition-all duration-700 ease-out transform
                ${infoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                delay-100 // Delay for staggered appearance
                hover:scale-105 // Added hover effects
                ${theme === 'dark'
                  ? 'bg-gray-900 bg-opacity-70 border-red-700 text-gray-100 hover:border-white'
                  : 'bg-white bg-opacity-70 border-red-300 text-gray-900 hover:border-gray-500'
                }
              `}>
              <h3 className={`text-2xl font-bold mb-4 transition-colors duration-500
                              ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>Personalized Training</h3> {/* Deep red for light mode */}
              <p className={`text-md leading-relaxed transition-colors duration-500
                             ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}> {/* Darker gray for light mode */}
                AI-driven workouts tailored to your goals, body, and progress. Every session optimized for you.
              </p>
            </div>
            {/* Feature Card 2 */}
            <div className={`
                p-8 rounded-xl shadow-xl border-2 text-center
                transition-all duration-700 ease-out transform
                ${infoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                delay-200 // Delay for staggered appearance
                hover:scale-105 // Added hover effects
                ${theme === 'dark'
                  ? 'bg-gray-900 bg-opacity-70 border-red-700 text-gray-100 hover:border-white'
                  : 'bg-white bg-opacity-70 border-red-300 text-gray-900 hover:border-gray-500'
                }
              `}>
              <h3 className={`text-2xl font-bold mb-4 transition-colors duration-500
                              ${theme === 'dark' ? 'text-blue-400' : 'text-blue-800'}`}>Nutrition Guidance</h3> {/* Deep blue for light mode */}
              <p className={`text-md leading-relaxed transition-colors duration-500
                             ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}> {/* Darker gray for light mode */}
                Custom meal plans and dietary advice to fuel your body effectively for optimal results.
              </p>
            </div>
            {/* Feature Card 3 */}
            <div className={`
                p-8 rounded-xl shadow-xl border-2 text-center
                transition-all duration-700 ease-out transform
                ${infoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                delay-300 // Delay for staggered appearance
                hover:scale-105 // Added hover effects
                ${theme === 'dark'
                  ? 'bg-gray-900 bg-opacity-70 border-red-700 text-gray-100 hover:border-white'
                  : 'bg-white bg-opacity-70 border-red-300 text-gray-900 hover:border-gray-500'
                }
              `}>
              <h3 className={`text-2xl font-bold mb-4 transition-colors duration-500
                              ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>Mind-Body Wellness</h3> {/* Deep red for light mode */}
              <p className={`text-md leading-relaxed transition-colors duration-500
                             ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}> {/* Darker gray for light mode */}
                Integrate mindfulness and recovery practices to achieve holistic health and mental clarity.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
