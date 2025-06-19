// src/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext'; // Import useTheme hook
// Assuming loginUser is an action creator from auth services
// import { loginUser } from '../services/auth'; // Uncomment if loginUser is used

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useTheme(); // Use theme from context

  const { loading, error, isAuthenticated, sessionChecked } = useSelector((state) => state.auth);

  // Effect to redirect on successful login or if already authenticated
  useEffect(() => {
    // Only redirect if session has been checked and user is authenticated
    if (sessionChecked && isAuthenticated) {
      navigate('/profile'); // Redirect to profile page or dashboard
    }
  }, [isAuthenticated, navigate, sessionChecked]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Assuming loginUser is defined and imported
    // dispatch(loginUser({ email, password }));
    console.log("Login attempt with:", { email, password });
    // Dummy login success/failure for demonstration if no actual backend login is hooked up
    if (email === "test@example.com" && password === "password") {
      console.log("Dummy login successful, navigating to dashboard.");
      navigate("/dashboard");
    } else {
      console.log("Dummy login failed.");
      // You might want to set an error state here
    }
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  // imageUrl is now intentionally empty to only show the gradient background
  const imageUrl = "";

  return (
    <div className="relative min-h-screen w-screen flex flex-col items-center justify-start p-4 overflow-hidden">
      {/* Background layers */}
      {/* This div will effectively not render any image because imageUrl is empty */}
      {imageUrl && (
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }}></div>
      )}
      <div
        className={`absolute inset-0 animate-gradient opacity-70`}
        style={{
          backgroundImage: theme === 'dark'
            ? 'linear-gradient(to right, #1e3a8a, #7f1d1d, #000000)' // Dark mode gradient
            : 'linear-gradient(to right, #b57ef5, #FFFFFF, #f3f360)', // Light mode gradient: Slightly Darker Purple, White, Very Light Yellow
          backgroundSize: '200% 200%',
          animation: 'gradient 6.50s ease infinite', // Consistent animation speed
        }}
      >
        <style>{`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes typing {
            from { width: 0 }
            to { width: 100% }
          }
        `}</style>
      </div>

      {/* Content Layer (Form) */}
      {/* Added pt-20 and pb-10 to push content below the fixed Navbar and provide bottom spacing */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-md pt-20 pb-10">
        <h1
          className={`text-5xl md:text-6xl lg:text-7xl font-extrabold text-center mb-12 overflow-hidden whitespace-nowrap font-mono transition-colors duration-500
                      ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`} // Deep blue for light mode
          style={{ width: 'fit-content', animation: 'typing 2.5s steps(32) infinite alternate' }}
        >
          Fitness 2099
        </h1>

        <div className={`rounded-xl shadow-xl p-8 w-full max-w-md border-2 transition-colors duration-500
                    ${theme === 'dark' ? 'bg-gray-900 bg-opacity-75 border-red-700' : 'bg-white bg-opacity-75 border-blue-300'}`}>
          <h2 className={`text-3xl font-bold text-center mb-8 transition-colors duration-500
                      ${theme === 'dark' ? 'text-blue-500' : 'text-blue-700'}`}>Sign In</h2> {/* Deep blue for light mode */}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className={`block text-sm font-bold mb-2 transition-colors duration-500
                                          ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Email</label> {/* Darker gray for light mode */}
              <input
                type="email" id="email"
                className={`shadow appearance-none border rounded-md w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:border-transparent transition duration-200 ease-in-out
                            ${theme === 'dark'
                              ? 'bg-gray-800 text-gray-100 border-gray-700 focus:ring-blue-600'
                              : 'bg-gray-100 text-gray-900 border-gray-300 focus:ring-blue-400'}`} // Text black, border gray, focus blue for light mode
                placeholder="your@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required
              />
            </div>
            <div className="mb-8">
              <label htmlFor="password" className={`block text-sm font-bold mb-2 transition-colors duration-500
                                          ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Password</label> {/* Darker gray for light mode */}
              <input
                type="password" id="password"
                className={`shadow appearance-none border rounded-md w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:border-transparent transition duration-200 ease-in-out
                            ${theme === 'dark'
                              ? 'bg-gray-800 text-gray-100 border-gray-700 focus:ring-blue-600'
                              : 'bg-gray-100 text-gray-900 border-gray-300 focus:ring-blue-400'}`} // Text black, border gray, focus blue for light mode
                placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className={`font-bold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105
                            ${theme === 'dark' ? 'bg-red-800 hover:bg-red-900 text-white' : 'bg-red-700 hover:bg-red-800 text-white'}`} // Deep Red button for light mode
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
            {error && (
              <p className={`text-center mt-4 transition-colors duration-500 ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>Error: {error}</p>
            )}
          </form>
        </div>
        <div className={`mt-10 font-extrabold text-2xl flex items-center justify-center transition-colors duration-500
                    ${theme === 'dark' ? 'text-blue-500' : 'text-blue-700'}`}> {/* Deep Blue for light mode */}
          <span>Do not have an account?</span>
        </div>
        <button
          className={`mt-4 font-bold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105
                      ${theme === 'dark' ? 'bg-blue-700 hover:bg-blue-800 text-white' : 'bg-blue-800 hover:bg-blue-900 text-white'}`} 
          onClick={handleSignUpClick}
        >
          Sign UP now
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
