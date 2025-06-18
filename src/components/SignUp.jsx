// src/pages/SignupPage.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from './features/auth/AuthSlice.jsx'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sex, setSex] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [trainingExperience, setTrainingExperience] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated, sessionChecked } = useSelector((state) => state.auth);

  useEffect(() => {
    // Only redirect if session has been checked and user is authenticated
    if (sessionChecked && isAuthenticated) {
      navigate('/profile'); // Redirect to profile page or dashboard after signup
    }
  }, [isAuthenticated, navigate, sessionChecked]);

  const imageUrl = "/src/assets/Untitled design.png";

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name,
      age: age ? parseInt(age, 10) : undefined,
      email,
      password,
      gender: sex,
      ...(height && { height: parseFloat(height) }),
      ...(weight && { weight: parseFloat(weight) }),
      ...(trainingExperience && { trainingExperience: parseInt(trainingExperience, 10) }),
    };

    dispatch(registerUser(formData));
  };

  const handleSignInClick = () => {
    navigate('/login');
  };

  return (
    <div className="relative h-screen w-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Background layers */}
      {/* ... (Your existing background JSX) ... */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }}></div>
      <div
        className="absolute inset-0 bg-gradient-to-r from-blue-900 via-red-900 to-black animate-gradient opacity-70"
        style={{ backgroundSize: '200% 200%', animation: 'gradient 10s ease infinite' }}
      >
        <style>{`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </div>

      {/* Content Layer (Form) */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md">
        <div className="bg-gray-900 bg-opacity-75 rounded-xl shadow-xl p-8 w-full border-2 border-red-700">
          <h2 className="text-3xl font-bold text-center text-blue-500 mb-8">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-300 text-sm font-bold mb-2">Name</label>
              <input type="text" id="name" className="shadow appearance-none border border-gray-700 rounded-md w-full py-3 px-4 bg-gray-800 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 ease-in-out" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="mb-4">
              <label htmlFor="age" className="block text-gray-300 text-sm font-bold mb-2">Age</label>
              <input type="number" id="age" className="shadow appearance-none border border-gray-700 rounded-md w-full py-3 px-4 bg-gray-800 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 ease-in-out" placeholder="e.g. 30" value={age} onChange={(e) => setAge(e.target.value)} min="1" required />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">Email</label>
              <input type="email" id="email" className="shadow appearance-none border border-gray-700 rounded-md w-full py-3 px-4 bg-gray-800 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 ease-in-out" placeholder="your@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-300 text-sm font-bold mb-2">Password</label>
              <input type="password" id="password" className="shadow appearance-none border border-gray-700 rounded-md w-full py-3 px-4 bg-gray-800 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 ease-in-out" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="mb-4">
              <label htmlFor="sex" className="block text-gray-300 text-sm font-bold mb-2">Gender</label>
              <select id="sex" className="shadow appearance-none border border-gray-700 rounded-md w-full py-3 px-4 bg-gray-800 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 ease-in-out" value={sex} onChange={(e) => setSex(e.target.value)} required>
                <option value="">Select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="height" className="block text-gray-300 text-sm font-bold mb-2">Height (in cms) <span className="text-gray-500 text-xs">(Optional)</span></label>
              <input type="number" id="height" className="shadow appearance-none border border-gray-700 rounded-md w-full py-3 px-4 bg-gray-800 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 ease-in-out" placeholder="e.g. 175" value={height} onChange={(e) => setHeight(e.target.value)} min="0" />
            </div>
            <div className="mb-4">
              <label htmlFor="weight" className="block text-gray-300 text-sm font-bold mb-2">Weight (in kg) <span className="text-gray-500 text-xs">(Optional)</span></label>
              <input type="number" id="weight" className="shadow appearance-none border border-gray-700 rounded-md w-full py-3 px-4 bg-gray-800 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 ease-in-out" placeholder="e.g. 70.5" value={weight} onChange={(e) => setWeight(e.target.value)} step="0.1" min="0" />
            </div>
            <div className="mb-6">
              <label htmlFor="trainingExperience" className="block text-gray-300 text-sm font-bold mb-2">Training Experience (in months) <span className="text-gray-500 text-xs">(Optional)</span></label>
              <input type="number" id="trainingExperience" className="shadow appearance-none border border-gray-700 rounded-md w-full py-3 px-4 bg-gray-800 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 ease-in-out" placeholder="e.g. 12" value={trainingExperience} onChange={(e) => setTrainingExperience(e.target.value)} min="0" />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-red-800 hover:bg-red-900 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
                disabled={loading}
              >
                {loading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </div>
            {error && (
              <p className="text-red-400 text-center mt-4">Error: {error}</p>
            )}
          </form>
        </div>
        <div className='mt-10 font-extrabold text-2xl text-blue-500 flex items-center justify-center'>
          <span>Already have an account?</span>
        </div>
        <button
          className='mt-4 bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105'
          onClick={handleSignInClick}
        >
          Sign In now
        </button>
      </div>
    </div>
  );
};

export default SignupPage;