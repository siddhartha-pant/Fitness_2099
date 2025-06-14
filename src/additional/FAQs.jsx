import React, { useState } from 'react';

const FAQPage = () => {
  // State to manage which accordion item is currently open
  const [openIndex, setOpenIndex] = useState(null); // null means all are closed

  // Array of FAQ data
  const faqData = [
    {
      question: "What is Fitness 2099?",
      answer: "Fitness 2099 is a revolutionary platform dedicated to transforming your health and wellness journey. We combine cutting-edge technology with personalized guidance to help you achieve peak physical and mental well-being."
    },
    {
      question: "How does personalized training work?",
      answer: "Our AI-driven system analyzes your goals, current fitness level, and progress to create bespoke workout plans. These plans adapt in real-time, ensuring every session is optimized for your individual needs and maximizes your results."
    },
    {
      question: "Do you offer nutrition guidance?",
      answer: "Yes, we provide custom meal plans and expert dietary advice. Our nutrition programs are designed to complement your training, ensuring your body receives the fuel it needs for performance, recovery, and overall health."
    },
    {
      question: "Is there a focus on mental wellness?",
      answer: "Absolutely! We believe in holistic well-being. Our platform integrates mindfulness exercises, recovery protocols, and mental resilience techniques to help you achieve balance and mental clarity alongside physical fitness."
    },
    {
      question: "What kind of experience do I need to join?",
      answer: "Fitness 2099 is designed for all levels, from beginners to advanced athletes. Our personalized approach means your program will be tailored to your current experience and evolves as you progress."
    },
    {
      question: "How can I contact support?",
      answer: "You can reach our support team through the 'Contact Us' section in the navigation bar or footer. We're here to assist you with any questions or technical support you might need."
    }
  ];

  // Function to toggle accordion item visibility
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Open if closed, close if open
  };

  // Background image URL (reused for consistent background)
  const backgroundImage = "https://cs.google.com/api/image_generation_content/content/fetch?id=uploaded:Untitled%20design.jpg-50f03062-f45f-4508-b0ab-c0f295c91275&w=1280&h=720&f=webp";

  return (
    <div className="relative h-auto min-h-screen w-screen flex flex-col items-center justify-start p-0 overflow-hidden">
      {/* Layer 1: Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      {/* Layer 2: Gradient Overlay */}
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

      {/* Content Layer (FAQ Section) */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl py-8 md:py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-blue-400 mb-10 drop-shadow-lg">
          Frequently Asked Questions
        </h1>

        {/* FAQ Accordion Container */}
        <div className="w-full bg-gray-900 bg-opacity-75 rounded-xl shadow-xl border-2 border-red-700 p-6 md:p-8">
          {faqData.map((item, index) => (
            <div key={index} className="border-b border-gray-700 last:border-b-0 py-4">
              {/* Accordion Question Header */}
              <button
                className="flex justify-between items-center w-full text-left text-lg md:text-xl font-semibold text-white hover:text-blue-400 transition-colors duration-200 focus:outline-none"
                onClick={() => toggleAccordion(index)}
                aria-expanded={openIndex === index}
              >
                {item.question}
                {/* Plus/Minus Icon */}
                <svg
                  className={`w-6 h-6 transform transition-transform duration-300 ${
                    openIndex === index ? 'rotate-45 text-red-500' : 'rotate-0 text-blue-400'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
              </button>

              {/* Accordion Answer Content */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? 'max-h-screen opacity-100 mt-3' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-gray-300 text-base md:text-lg pl-2 pt-2 pr-2 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
