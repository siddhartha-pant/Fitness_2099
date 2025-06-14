import React, { useState } from 'react';

const SignupPage = () => {
  // State for all form fields
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [sex, setSex] = useState(''); // 'male', 'female', 'other', or ''
  const [height, setHeight] = useState(''); // Optional, in cms
  const [weight, setWeight] = useState(''); // Optional, in kg
  const [trainingExperience, setTrainingExperience] = useState(''); // Optional, in months

  // URL for the background image
  const imageUrl = "https://cs.google.com/api/image_generation_content/content/fetch?id=uploaded:Untitled%20design.jpg-50f03062-f45f-4508-b0ab-c0f295c91275&w=1280&h=720&f=webp";

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gather all form data
    const formData = {
      name,
      age,
      email,
      sex,
      height: height ? parseFloat(height) : null, // Convert to number if provided, otherwise null
      weight: weight ? parseFloat(weight) : null, // Convert to number if provided, otherwise null
      trainingExperience: trainingExperience ? parseInt(trainingExperience, 10) : null, // Convert to integer if provided, otherwise null
    }; 
    console.log('Signup Form Data:', formData);
    alert('Signup attempt with: ' + JSON.stringify(formData, null, 2));
    // In a real application, you would send this data to your backend API
  };

  return (
    // Main container for the entire page, relative for positioning children
    <div className="relative h-screen w-screen flex flex-col items-center justify-center p-4 overflow-hidden">

      {/* Layer 1: Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center" // Covers the entire parent, centers image
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>

      {/* Layer 2: Gradient Overlay (on top of image, with animation and opacity) */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-blue-900 via-red-900 to-black animate-gradient opacity-70" // opacity-70 makes it semi-transparent
        style={{
          backgroundSize: '200% 200%',
          animation: 'gradient 10s ease infinite',
        }}
      >
        <style>
          {`
            /* Keyframes for the gradient background animation */
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
      </div>

      {/* Layer 3: Content (Signup Form - placed above the background layers) */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md"> {/* z-10 brings this content to the front */}

        {/* Signup Form */}
        <div className="bg-gray-900 bg-opacity-75 rounded-xl shadow-xl p-8 w-full border-2 border-red-700">
          <h2 className="text-3xl font-bold text-center text-blue-500 mb-8">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-300 text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="shadow appearance-none border border-gray-700 rounded-md w-full py-3 px-4 bg-gray-800 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 ease-in-out"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Age Input */}
            <div className="mb-4">
              <label htmlFor="age" className="block text-gray-300 text-sm font-bold mb-2">
                Age
              </label>
              <input
                type="number"
                id="age"
                className="shadow appearance-none border border-gray-700 rounded-md w-full py-3 px-4 bg-gray-800 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 ease-in-out"
                placeholder="e.g. 30"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="1" // Age must be at least 1
                required
              />
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="shadow appearance-none border border-gray-700 rounded-md w-full py-3 px-4 bg-gray-800 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 ease-in-out"
                placeholder="your@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Sex Select */}
            <div className="mb-4">
              <label htmlFor="sex" className="block text-gray-300 text-sm font-bold mb-2">
                Sex
              </label>
              <select
                id="sex"
                className="shadow appearance-none border border-gray-700 rounded-md w-full py-3 px-4 bg-gray-800 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 ease-in-out"
                value={sex}
                onChange={(e) => setSex(e.target.value)}
                required
              >
                <option value="">Select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Height (Optional) Input */}
            <div className="mb-4">
              <label htmlFor="height" className="block text-gray-300 text-sm font-bold mb-2">
                Height (in cms) <span className="text-gray-500 text-xs">(Optional)</span>
              </label>
              <input
                type="number"
                id="height"
                className="shadow appearance-none border border-gray-700 rounded-md w-full py-3 px-4 bg-gray-800 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 ease-in-out"
                placeholder="e.g. 175"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                min="0" // Height can't be negative
              />
            </div>

            {/* Weight (Optional) Input */}
            <div className="mb-4">
              <label htmlFor="weight" className="block text-gray-300 text-sm font-bold mb-2">
                Weight (in kg) <span className="text-gray-500 text-xs">(Optional)</span>
              </label>
              <input
                type="number"
                id="weight"
                className="shadow appearance-none border border-gray-700 rounded-md w-full py-3 px-4 bg-gray-800 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 ease-in-out"
                placeholder="e.g. 70.5"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                step="0.1" // Allow decimal values
                min="0" // Weight can't be negative
              />
            </div>

            {/* Training Experience (Optional) Input */}
            <div className="mb-6">
              <label htmlFor="trainingExperience" className="block text-gray-300 text-sm font-bold mb-2">
                Training Experience (in months) <span className="text-gray-500 text-xs">(Optional)</span>
              </label>
              <input
                type="number"
                id="trainingExperience"
                className="shadow appearance-none border border-gray-700 rounded-md w-full py-3 px-4 bg-gray-800 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 ease-in-out"
                placeholder="e.g. 12"
                value={trainingExperience}
                onChange={(e) => setTrainingExperience(e.target.value)}
                min="0" // Experience can't be negative
              />
            </div>

            {/* Sign Up Button */}
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-red-800 hover:bg-red-900 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
