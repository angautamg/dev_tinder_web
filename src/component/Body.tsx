import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { API_BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";


const Body = () => {
const dispatch = useDispatch();
const navigate = useNavigate();
const user = useSelector((state: any) => state.user);

const fetchUser = async () => {
   // If user already exists in state, no need to fetch again
  try {
    const res:any = await axios.get(`${API_BASE_URL}user/profile`, 
      {
        withCredentials: true, // Include cookies for authentication
    });
    dispatch(addUser(res.data.user));
  } catch (error:any) {
     if(error.status !== 401) {
      navigate("/login");
    }
  }
};

useEffect(() => {
  if(user) return ;
  fetchUser();
},[]);


  return (
  <div>
    <Navbar />
    <Outlet />
    <Footer />
  </div>
  );
}
export default Body;