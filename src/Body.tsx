import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Body = () => {
  return (
  <div>
    <Navbar />
    <Outlet />
    <Footer />
  </div>
  );
}
export default Body;