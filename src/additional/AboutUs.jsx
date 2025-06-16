import React, { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone'; // Import Tone.js

const AboutUsPage = () => {
  // State to hold the chat messages (questions sent, answers received)
  const [chatHistory, setChatHistory] = useState([]);
  // State to hold questions that can still be "asked"
  const [availableQuestions, setAvailableQuestions] = useState([]);
  // Ref for auto-scrolling chat to bottom (kept for potential future manual scroll, but auto-scroll removed)
  const chatMessagesEndRef = useRef(null);
  // Ref for Tone.js synthesizer
  const synth = useRef(null);
  // New state to control the visibility of the typing indicator
  const [isTyping, setIsTyping] = useState(false);

  // Background image URL (reused for consistent background)
  // IMPORTANT: Set this to an empty string to remove the placeholder image, relying only on the gradient.
  const backgroundImage = ""; // Changed to empty string to remove placeholder text

  // Data for the About Us content, structured for chat (question/answer pairs)
  const initialAboutData = [
    {
      id: 'mission',
      question: "Tell me about your mission.",
      answer: "At Fitness 2099, our mission is to empower individuals to transcend their physical and mental limits. We leverage futuristic technology to make personalized wellness accessible, guiding you towards a healthier, stronger, and more resilient future self."
    },
    {
      id: 'vision',
      question: "What is your vision for the future?",
      answer: "We envision a world where every person is equipped with the tools and knowledge to achieve their optimal well-being. By integrating advanced AI, data-driven insights, and human expertise, we're building the future of fitness, today."
    },
    {
      id: 'values',
      question: "What are your core values?",
      answer: "Innovation, Empowerment, Integrity, Community, and Excellence. These core values drive every decision we make, ensuring we deliver transformative experiences with transparency and dedication."
    },
    {
      id: 'whyChooseUs',
      question: "Why should I choose Fitness 2099?",
      answer: "Unlike traditional fitness approaches, we offer truly personalized, adaptive programs supported by state-of-the-art technology. Our holistic methodology addresses both physical and mental aspects, ensuring sustainable results and a comprehensive well-being transformation."
    }
  ];

  // Initialize Tone.js synth when component mounts
  useEffect(() => {
    console.log("AboutUsPage mounted. Initializing Tone.js synth.");
    synth.current = new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: "sine" // Simple sine wave for clean tones
      },
      envelope: {
        attack: 0.01,
        decay: 0.2,
        sustain: 0.1,
        release: 0.5
      }
    }).toDestination();

    // Initialize available questions and a welcome message when the component mounts
    setAvailableQuestions(initialAboutData);
    setChatHistory([{ type: 'received', content: "Hello! I'm Siddhartha, founder of Fitness 2099. What would you like to know about us?" }]);

    return () => {
      // Dispose of Tone.js synth on unmount to prevent memory leaks
      if (synth.current) {
        console.log("AboutUsPage unmounted. Disposing Tone.js synth.");
        synth.current.dispose();
      }
    };
  }, []);

  // Function to simulate asking a question and receiving an answer
  const askQuestion = async (questionObj) => {
    console.log(`Question asked: ${questionObj.question}`);
    // Ensure Tone.js audio context is started by user interaction
    if (Tone.context.state !== 'running') {
      try {
        await Tone.start();
        console.log("Tone.js audio context started.");
      } catch (error) {
        console.error("Failed to start Tone.js audio context:", error);
      }
    }

    // Play sent message sound
    if (synth.current) {
      synth.current.triggerAttackRelease("C4", "16n"); // Short, higher tone for sent
    }

    // Add the user's question to the chat history
    setChatHistory((prev) => [...prev, { type: 'sent', content: questionObj.question }]);

    // Remove the question from the available list
    setAvailableQuestions((prev) => prev.filter(q => q.id !== questionObj.id));

    // Show typing indicator
    setIsTyping(true);
    console.log("Typing indicator shown.");

    // Simulate AI typing/thinking delay, then add the answer and play sound
    setTimeout(() => {
      setIsTyping(false); // Hide typing indicator
      console.log("Typing indicator hidden. Adding AI response.");
      if (synth.current) {
        synth.current.triggerAttackRelease("G3", "8n"); // Slightly longer, lower tone for received
      }
      setChatHistory((prev) => [...prev, { type: 'received', content: questionObj.answer }]);
    }, 1500); // 1.5 second delay for AI response
  };

  // Function to open email client - NOW OPENS GMAIL COMPOSE
  const openEmailClient = () => {
    const emailAddress = "iamsiddhartha23@gmail.com";
    const subject = encodeURIComponent("More questions about Fitness 2099");
    // Use Gmail-specific URL to open compose window
    const gmailUrl = `https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=${emailAddress}&su=${subject}`;
    console.log(`Attempting to open Gmail compose to: ${gmailUrl}`);
    window.open(gmailUrl, '_blank'); // Open in a new tab/window
  };

  return (
    <div className="relative h-auto min-h-screen w-screen flex flex-col items-center justify-start p-0 overflow-hidden">
      {/* Layer 1: Background Image - Now empty, so only gradient below will show */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }} // backgroundImage is now empty
      ></div>

      {/* Layer 2: Gradient Overlay - This will now be the primary background */}
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
            @keyframes chat-bubble-pop {
              0% { transform: scale(0.8); opacity: 0; }
              100% { transform: scale(1); opacity: 1; }
            }
            .animate-chat-bubble-pop {
              animation: chat-bubble-pop 0.3s ease-out forwards;
            }
            /* New keyframes for typing indicator dots */
            @keyframes dot-blink {
              0%, 80%, 100% { opacity: 0; }
              40% { opacity: 1; }
            }
            .typing-indicator .dot {
              animation: dot-blink 1.4s infinite;
              opacity: 0; /* Start hidden */
            }
            .typing-indicator .dot-1 { animation-delay: 0s; }
            .typing-indicator .dot-2 { animation-delay: 0.2s; }
            .typing-indicator .dot-3 { animation-delay: 0.4s; }
          `}
        </style>
      </div>

      {/* Main Chat Interface Container (mimicking a phone screen) */}
      <div className="relative z-10 flex flex-col w-full max-w-md h-[90vh] md:h-[80vh] bg-gray-900 bg-opacity-80 rounded-2xl shadow-2xl border-2 border-red-700 overflow-hidden my-8">

        {/* Chat Header */}
        <div className="p-4 bg-gradient-to-r from-blue-800 to-red-800 text-white text-center font-bold text-xl rounded-t-xl shadow-md">
          Ask us About us!
        </div>

        {/* Chat Messages Area */}
        <div className="flex-grow p-4 overflow-y-auto space-y-4 custom-scrollbar">
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`
                  p-3 max-w-[80%] text-gray-100 shadow-md
                  ${msg.type === 'sent'
                    ? 'bg-blue-600 rounded-lg rounded-br-none' // iMessage-like sent bubble
                    : 'bg-gray-700 rounded-lg rounded-bl-none'  // iMessage-like received bubble
                  }
                  animate-chat-bubble-pop
                `}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-700 rounded-lg rounded-bl-none p-3 max-w-[80%] shadow-md animate-chat-bubble-pop">
                <div className="typing-indicator flex space-x-1">
                  <span className="dot dot-1">.</span>
                  <span className="dot dot-2">.</span>
                  <span className="dot dot-3">.</span>
                </div>
              </div>
            </div>
          )}
          {/* Dummy element to scroll to (kept, but auto-scroll removed) */}
          <div ref={chatMessagesEndRef} />
        </div>

        {/* Chat Input/Question Selection Area */}
        <div className="p-4 bg-gray-800 border-t border-gray-700 flex flex-wrap justify-center gap-2">
          {availableQuestions.length > 0 ? (
            availableQuestions.map((q) => (
              <button
                key={q.id}
                onClick={() => askQuestion(q)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-full
                           transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
              >
                {q.question}
              </button>
            ))
          ) : (
            <button
              onClick={openEmailClient}
              className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2 px-4 rounded-full
                         transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
            >
              More questions?
            </button>
          )}
        </div>
      </div>
      {/* Custom scrollbar style for chat messages area */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #333;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #aaa;
        }
      `}</style>
    </div>
  );
};

export default AboutUsPage;
