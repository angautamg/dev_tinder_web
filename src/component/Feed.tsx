import axios from "axios";
import { API_BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
    const feed: [] = useSelector((state: any) => state.feed);

    const dispatch = useDispatch();

    const getFeed = async () => {
        if (feed) return; // If feed already exists in state, no need to fetch again

        try {
            const res = await axios.get(`${API_BASE_URL}feed`, {
                withCredentials: true, // Include cookies for authentication
            });
            dispatch(addFeed(res.data.data));
        } catch (err) {

        }
    }
    useEffect(() => {
        getFeed();
    }, []);

    return (
        <div className="min-h-screen p-8">
            <h3 className="text-2xl font-bold mb-6">Feed</h3>
            <div className="flex flex-block flex-wrap gap-8 justify-center">
                <div className="flex flex-wrap gap-6 justify-center items-center min-h-screen">

                    {feed && feed.length > 0 ? (
                        feed.map((user: any, idx: number) => (
                            <UserCard key={idx} user={user} />
                        ))
                    ) : (
                        <span className="text-lg text-gray-500">No users found.</span>
                    )}
                </div>
            </div>
        </div>
    ); 
}
export default Feed;