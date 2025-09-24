import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { API_BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import ToastContainer from "./ToastContainer";
import { hideToast } from "../utils/toasterSlice";


const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user);
  const toaster = useSelector((state: any) => state.toaster);

  const fetchUser = async () => {
    // If user already exists in state, no need to fetch again
    try {
      const res: any = await axios.get(`${API_BASE_URL}user/profile`,
        {
          withCredentials: true, // Include cookies for authentication
        });
      dispatch(addUser(res.data.user));
    } catch (error: any) {
      if (error.status !== 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    if (user) return;
    fetchUser();
  }, []);
  
  useEffect(() => {
    if (toaster && toaster.message) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 2000); // 2 seconds timeout
      return () => clearTimeout(timer);
    }
  }, [toaster]);


  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
      {/* Toast Notifications */}

      {toaster && toaster.message && (
        <ToastContainer message_type={toaster.message_type} message={toaster.message} />
      )}

    </div>
  );
}
export default Body;