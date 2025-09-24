import { API_BASE_URL } from "../utils/constant";
import { useDispatch, useSelector }   from "react-redux";
import { removeRequest } from "../utils/requestSlice";
import axios from "axios";
import { useEffect } from "react";


const Request = () => {
    const request=useSelector((state:any) => state.request);

    const dispatch = useDispatch();
    const reviewRequest=async (status:any,_id:any)=>{
      const res= await axios.post(`${API_BASE_URL}request/review/${status}/${_id}`,
        {},
        {withCredentials:true});
        if(res.status===200){
        //dispatch(removeRequest());
        }
       

    }

    useEffect(()=>{
   
    },[]);


  return <div>Request</div>;
}

export default Request