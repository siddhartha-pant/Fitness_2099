import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import SignupPage from "./components/SignUp.jsx";
import LoginPage from "./components/LoginPage.jsx";
import FinalDisplayer from "./components/FinalDisplayer.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { Provider } from "react-redux";
import store from "./redux/Store.jsx";
import FAQPage from "./additional/FAQs.jsx";
import AboutUsPage from "./additional/AboutUs.jsx";
import DashboardPage from "./components/Dashboard.jsx";
import DailyFoodDiary from "./components/DailyFoodDiary.jsx";
import DailyMoodLog from "./components/DailyMood.jsx";
import PhotoUpload from "./components/PhotoUpload.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <FinalDisplayer />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/signIn",
        element: <LoginPage />,
      },
      {
        path: "/home",
        element: <App />,
      },
      {
        path: "/faqs",
        element: <FAQPage />,
      },
      {
        path: "/aboutus",
        element: <AboutUsPage />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/photoUpload",
        element: <PhotoUpload />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
