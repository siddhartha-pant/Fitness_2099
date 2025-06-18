// src/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './features/auth/AuthSlice.jsx'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    dispatch(loginUser({ email, password }));
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const imageUrl = "/src/assets/Untitled design.png";

  return (
    <div className="relative h-screen w-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Background and gradient layers */}
      {/* ... (Your existing background JSX) ... */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }}></div>
      <div
        className="absolute inset-0 bg-gradient-to-r from-blue-900 via-red-900 to-black animate-gradient opacity-100"
        style={{ backgroundSize: '200% 200%', animation: 'gradient 3.55s ease infinite' }}
      >
        <style>
          {`
            @keyframes gradient {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            @keyframes typing {
              from { width: 0 }
              to { width: 100% }
            }
          `}
        </style>
      </div>

      {/* Content Layer (Form) */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md">
        <h1
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-blue-400 text-center mb-12 overflow-hidden whitespace-nowrap font-mono"
          style={{ width: 'fit-content', animation: 'typing 2.5s steps(32) infinite alternate' }}
        >
          Fitness 2099
        </h1>

        <div className="bg-gray-900 bg-opacity-75 rounded-xl shadow-xl p-8 w-full max-w-md border-2 border-red-700">
          <h2 className="text-3xl font-bold text-center text-blue-500 mb-8">Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">Email</label>
              <input
                type="email" id="email"
                className="shadow appearance-none border border-gray-700 rounded-md w-full py-3 px-4 bg-gray-800 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 ease-in-out"
                placeholder="your@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required
              />
            </div>
            <div className="mb-8">
              <label htmlFor="password" className="block text-gray-300 text-sm font-bold mb-2">Password</label>
              <input
                type="password" id="password"
                className="shadow appearance-none border border-gray-700 rounded-md w-full py-3 px-4 bg-gray-800 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 ease-in-out"
                placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-red-800 hover:bg-red-900 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
            {error && (
              <p className="text-red-400 text-center mt-4">Error: {error}</p>
            )}
          </form>
        </div>
        <div className='mt-10 font-extrabold text-2xl text-blue-500 flex items-center justify-center'>
          <span>Do not have an account?</span>
        </div>
        <button
          className='mt-4 bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105'
          onClick={handleSignUpClick}
        >
          Sign UP now
        </button>
      </div>
    </div>
  );
};

export default LoginPage;