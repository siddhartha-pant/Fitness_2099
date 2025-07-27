import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignUp";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Footer from "./components/Footer";
import FinalDisplayer from "./components/FinalDisplayer";
import Loader from "./components/Loader";
import FAQPage from "./additional/FAQs";
import AboutUsPage from "./additional/AboutUs";
import { useSelector } from "react-redux";
import PhotoUpload from "./components/PhotoUpload";
import DashboardPage from "./components/Dashboard";

function App() {
  console.log("APP");
  const [showLoader, setShowLoader] = useState(true);
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);
  console.log(isAuthenticated, "pata chale");

  const handleLoaderComplete = () => {
    setShowLoader(false);
  };

  return (
    <div className="App min-h-screen flex flex-col">
      {/* Conditional Rendering: */}
      {showLoader ? (
        // IF showLoader is true, render ONLY the Loader component
        <Loader onLoadComplete={handleLoaderComplete} />
      ) : (
        // ELSE (if showLoader is false), render your main website content
        <>
          <Navbar /> {/* Your fixed Navbar */}
          <main className="flex-grow pt-16">
            {" "}
            {/* Main content area, flex-grow to push footer down */}
            <DashboardPage /> {/* Your Landing Page */}
          </main>
          <Footer /> {/* Your Footer */}
        </>
      )}

      {/* Optional: Your example page switching buttons (only visible after loader is gone) */}
      {!showLoader && (
        <div className="fixed bottom-4 right-4 z-50 flex space-x-4">
          {/* Example buttons to switch between pages if you have multiple,
              e.g., Login, Signup, etc. These should only appear after the loader */}
          {/* <button onClick={() => console.log('Go to Login')} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Login</button> */}
          {/* <button onClick={() => console.log('Go to Signup')} className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">Signup</button> */}
        </div>
      )}
    </div>
  );
}

export default App;
