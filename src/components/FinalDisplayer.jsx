import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import LandingPage from "./LandingPage";
import Navbar from "./Navbar";

const FinalDisplayer = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
export default FinalDisplayer;
