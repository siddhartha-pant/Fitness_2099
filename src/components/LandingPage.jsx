import React, { useState, useEffect, useRef } from 'react'; // Import useRef

const LandingPage = () => {
  // Background image URL (reused from previous context)
  const backgroundImage = "https://cs.google.com/api/image_generation_content/content/fetch?id=uploaded:Untitled%20design.jpg-50f03062-f45f-4508-b0ab-c0f295c91275&w=1280&h=720&f=webp";

  // Dummy navigation handlers
  const handleSignIn = () => {
    alert('Sign In button clicked! (Navigate to login page)');
    // In a real app, use a router: navigate('/signin');
  };

  const handleSignUp = () => {
    alert('Sign Up button clicked! (Navigate to signup page)');
    // In a real app, use a router: navigate('/signup');
  };

  // Ref for the feature section to observe its visibility
  const featuresRef = useRef(null);
  // State to control the visibility/animation of the feature cards
  const [featuresVisible, setFeaturesVisible] = useState(false);

  // Effect for Intersection Observer to trigger the feature cards animation
  useEffect(() => {
    const currentRef = featuresRef.current; // Capture current ref to use in cleanup

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If the observed element (features section) is intersecting the viewport
          if (entry.isIntersecting) {
            setFeaturesVisible(true); // Set state to visible to trigger animation
            observer.unobserve(entry.target); // Stop observing once it's visible to prevent re-triggering
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the element is visible
      }
    );

    // Start observing the features section once the component mounts
    if (currentRef) {
      observer.observe(currentRef);
    }

    // Cleanup function: Disconnect the observer when the component unmounts
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div className="relative h-auto min-h-screen w-screen flex flex-col items-center justify-start p-0 overflow-hidden">
      {/* Layer 1: Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      {/* Layer 2: Gradient Overlay (with the same dynamic animation) */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-blue-900 via-red-900 to-black animate-gradient opacity-70"
        style={{
          backgroundSize: '200% 200%',
          animation: 'gradient 10s ease infinite',
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
        <section className="text-center text-white py-16 md:py-24 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-blue-400 mb-6 drop-shadow-lg">
            Unleash Your Future Self
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed px-4">
            Step into Fitness 2099 – where cutting-edge technology meets personalized wellness.
            Your journey to peak performance and holistic well-being starts here, today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <button
              onClick={handleSignUp}
              className="bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg
                         transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-500"
            >
              Start Your Journey
            </button>
            <button
              onClick={handleSignIn}
              className="bg-transparent border-2 border-blue-500 text-blue-300 font-bold py-3 px-8 rounded-full text-lg shadow-lg
                         transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-900 hover:border-blue-900
                         focus:outline-none focus:ring-4 focus:ring-blue-500"
            >
              Already a Member? Sign In
            </button>
          </div>
        </section>

        {/* Feature Section with scroll-triggered animation */}
        <section ref={featuresRef} className="w-full py-16 px-4">
          <h2 className="text-4xl font-bold text-center text-blue-500 mb-12 drop-shadow-md">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature Card 1 */}
            <div className={`
                bg-gray-900 bg-opacity-70 p-8 rounded-xl shadow-xl border-2 border-red-700 text-gray-100 text-center
                transition-all duration-700 ease-out transform
                ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                delay-100 // Delay for staggered appearance
                hover:scale-105 hover:border-white // Added hover effects
              `}>
              <h3 className="text-2xl font-bold text-red-400 mb-4">Personalized Training</h3>
              <p className="text-md leading-relaxed">
                AI-driven workouts tailored to your goals, body, and progress. Every session optimized for you.
              </p>
            </div>
            {/* Feature Card 2 */}
            <div className={`
                bg-gray-900 bg-opacity-70 p-8 rounded-xl shadow-xl border-2 border-red-700 text-gray-100 text-center
                transition-all duration-700 ease-out transform
                ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                delay-200 // Delay for staggered appearance
                hover:scale-105 hover:border-white // Added hover effects
              `}>
              <h3 className="text-2xl font-bold text-blue-400 mb-4">Nutrition Guidance</h3>
              <p className="text-md leading-relaxed">
                Custom meal plans and dietary advice to fuel your body effectively for optimal results.
              </p>
            </div>
            {/* Feature Card 3 */}
            <div className={`
                bg-gray-900 bg-opacity-70 p-8 rounded-xl shadow-xl border-2 border-red-700 text-gray-100 text-center
                transition-all duration-700 ease-out transform
                ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                delay-300 // Delay for staggered appearance
                hover:scale-105 hover:border-white // Added hover effects
              `}>
              <h3 className="text-2xl font-bold text-red-400 mb-4">Mind-Body Wellness</h3>
              <p className="text-md leading-relaxed">
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
