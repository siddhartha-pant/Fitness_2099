// src/pages/SignupPage.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/auth'; // Assuming this path is correct
import { useTheme } from '../context/ThemeContext'; // Import useTheme hook
import { loginSuccess } from '../redux/AuthSlice';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sex, setSex] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  // Initialize trainingExperience with an empty string for the select default option
  const [trainingExperience, setTrainingExperience] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useTheme(); // Use theme from context

  const { loading, error, isAuthenticated, sessionChecked } = useSelector((state) => state.auth);

  useEffect(() => {
    // Only redirect if session has been checked and user is authenticated
    if (sessionChecked && isAuthenticated) {
      navigate('/dashboard'); // Redirect to profile page or dashboard after signup
    }
  }, [isAuthenticated, navigate, sessionChecked]);

  // imageUrl is now intentionally empty to only show the gradient background
  const imageUrl = "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Parse trainingExperience to an integer or set to undefined if not selected/empty
    const parsedTrainingExperience = trainingExperience !== '' ? parseInt(trainingExperience, 10) : undefined;

    const formData = {
      name,
      age: age ? parseInt(age, 10) : undefined,
      email,
      password,
      gender: sex, // 'sex' state maps to 'gender' in formData
      ...(height && { height: parseFloat(height) }),
      ...(weight && { weight: parseFloat(weight) }),
      ...(parsedTrainingExperience !== undefined && { trainingExperience: parsedTrainingExperience }),
    };
    console.log(formData, "form data");
    try {
      console.log("Attempting signup...");
      const response = await signup(formData);
      if (response) {

        dispatch(loginSuccess(response.token));

        navigate("/dashboard");
      } else {
        console.log("Signup did not return data as expected.");
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const handleSignInClick = () => {
    navigate('/signin');
  };

  return (
    <div className="relative min-h-screen w-screen flex flex-col items-center justify-start p-4 overflow-hidden">
      {/* Background layers */}
      {imageUrl && (
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }}></div>
      )}
      <div
        className={`absolute inset-0 animate-gradient opacity-70`}
        style={{
          backgroundImage: theme === 'dark'
            ? 'linear-gradient(to right, #1e3a8a, #7f1d1d, #000000)' // Dark mode gradient
            : 'linear-gradient(to right, #D8BFD8, #FFFFFF, #FFFFE0)', // Light mode gradient
          backgroundSize: '200% 200%',
          animation: 'gradient 10s ease infinite',
        }}
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
      <div className="relative z-10 flex flex-col items-center w-full max-w-md pt-20 pb-10">
        <div className={`rounded-xl shadow-xl p-8 w-full border-2 transition-colors duration-500
                    ${theme === 'dark' ? 'bg-gray-900 bg-opacity-75 border-red-700' : 'bg-white bg-opacity-75 border-blue-300'}`}>
          <h2 className={`text-3xl font-bold text-center mb-8 transition-colors duration-500
                      ${theme === 'dark' ? 'text-blue-500' : 'text-blue-700'}`}>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className={`block text-sm font-bold mb-2 transition-colors duration-500
                                          ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Name</label>
              <input type="text" id="name" name="name"
                     className={`shadow appearance-none border rounded-md w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:border-transparent transition duration-200 ease-in-out
                                ${theme === 'dark'
                                  ? 'bg-gray-800 text-gray-100 border-gray-700 focus:ring-blue-600'
                                  : 'bg-gray-100 text-gray-900 border-gray-300 focus:ring-blue-400'}`}
                     placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="mb-4">
              <label htmlFor="age" className={`block text-sm font-bold mb-2 transition-colors duration-500
                                          ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Age</label>
              <input type="number" id="age" name="age"
                     className={`shadow appearance-none border rounded-md w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:border-transparent transition duration-200 ease-in-out
                                ${theme === 'dark'
                                  ? 'bg-gray-800 text-gray-100 border-gray-700 focus:ring-blue-600'
                                  : 'bg-gray-100 text-gray-900 border-gray-300 focus:ring-blue-400'}`}
                     placeholder="e.g. 30" value={age} onChange={(e) => setAge(e.target.value)} min="1" required />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className={`block text-sm font-bold mb-2 transition-colors duration-500
                                          ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
              <input type="email" id="email" name="email"
                     className={`shadow appearance-none border rounded-md w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:border-transparent transition duration-200 ease-in-out
                                ${theme === 'dark'
                                  ? 'bg-gray-800 text-gray-100 border-gray-700 focus:ring-blue-600'
                                  : 'bg-gray-100 text-gray-900 border-gray-300 focus:ring-blue-400'}`}
                     placeholder="your@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className={`block text-sm font-bold mb-2 transition-colors duration-500
                                          ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
              <input type="password" id="password" name="password"
                     className={`shadow appearance-none border rounded-md w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:border-transparent transition duration-200 ease-in-out
                                ${theme === 'dark'
                                  ? 'bg-gray-800 text-gray-100 border-gray-700 focus:ring-blue-600'
                                  : 'bg-gray-100 text-gray-900 border-gray-300 focus:ring-blue-400'}`}
                     placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="mb-4">
              <label htmlFor="sex" className={`block text-sm font-bold mb-2 transition-colors duration-500
                                          ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Gender</label>
              <select id="sex" name="sex"
                      className={`shadow appearance-none border rounded-md w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:border-transparent transition duration-200 ease-in-out
                                 ${theme === 'dark'
                                   ? 'bg-gray-800 text-gray-100 border-gray-700 focus:ring-blue-600'
                                   : 'bg-gray-100 text-gray-900 border-gray-300 focus:ring-blue-400'}`}
                      value={sex} onChange={(e) => setSex(e.target.value)} required>
                <option value="">Select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="height" className={`block text-sm font-bold mb-2 transition-colors duration-500
                                          ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Height (in cms) <span className={`text-xs transition-colors duration-500 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>(Optional)</span></label>
              <input type="number" id="height" name="height"
                     className={`shadow appearance-none border rounded-md w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:border-transparent transition duration-200 ease-in-out
                                ${theme === 'dark'
                                  ? 'bg-gray-800 text-gray-100 border-gray-700 focus:ring-blue-600'
                                  : 'bg-gray-100 text-gray-900 border-gray-300 focus:ring-blue-400'}`}
                     placeholder="e.g. 175" value={height} onChange={(e) => setHeight(e.target.value)} min="0" />
            </div>
            <div className="mb-4">
              <label htmlFor="weight" className={`block text-sm font-bold mb-2 transition-colors duration-500
                                          ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Weight (in kg) <span className={`text-xs transition-colors duration-500 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>(Optional)</span></label>
              <input type="number" id="weight" name="weight"
                     className={`shadow appearance-none border rounded-md w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:border-transparent transition duration-200 ease-in-out
                                ${theme === 'dark'
                                  ? 'bg-gray-800 text-gray-100 border-gray-700 focus:ring-blue-600'
                                  : 'bg-gray-100 text-gray-900 border-gray-300 focus:ring-blue-400'}`}
                     placeholder="e.g. 70.5" value={weight} onChange={(e) => setWeight(e.target.value)} step="0.1" min="0" />
            </div>
            <div className="mb-6">
              <label htmlFor="trainingExperience" className={`block text-sm font-bold mb-2 transition-colors duration-500
                                          ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Training Experience <span className={`text-xs transition-colors duration-500 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>(Optional)</span></label>
              <select id="trainingExperience" name="trainingExperience"
                      className={`shadow appearance-none border rounded-md w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:border-transparent transition duration-200 ease-in-out
                                 ${theme === 'dark'
                                   ? 'bg-gray-800 text-gray-100 border-gray-700 focus:ring-blue-600'
                                   : 'bg-gray-100 text-gray-900 border-gray-300 focus:ring-blue-400'}`}
                      value={trainingExperience} onChange={(e) => setTrainingExperience(e.target.value)}
              >
                <option value="">Select...</option>
                <option value="0">0-6 months</option>
                <option value="6">6 months-1 year</option>
                <option value="12">1-2 years</option>
                <option value="24">2-4 years</option>
                <option value="48">4 years and above</option>
              </select>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className={`font-bold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105
                            ${theme === 'dark' ? 'bg-red-800 hover:bg-red-900 text-white' : 'bg-red-700 hover:bg-red-800 text-white'}`}
                disabled={loading}
              >
                {loading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </div>
            {error && (
              <p className={`text-center mt-4 transition-colors duration-500 ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>Error: {error}</p>
            )}
          </form>
        </div>
        <div className={`mt-10 font-extrabold text-2xl flex items-center justify-center transition-colors duration-500
                    ${theme === 'dark' ? 'text-blue-500' : 'text-blue-700'}`}>
          <span>Already have an account?</span>
        </div>
        <button
          className={`mt-4 font-bold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105
                      ${theme === 'dark' ? 'bg-blue-700 hover:bg-blue-800 text-white' : 'bg-blue-800 hover:bg-blue-900 text-white'}`}
          onClick={handleSignInClick}
        >
          Sign In now
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
