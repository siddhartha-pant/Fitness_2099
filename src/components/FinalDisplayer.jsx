import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import LandingPage from "./LandingPage";
import Navbar from "./Navbar";

const FinalDisplayer = () => {
    return (<div>
          <Navbar/>  
      <Outlet/>
      <Footer/>  
    
    </div>)
    
}
export default FinalDisplayer;