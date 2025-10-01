import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../utils/constant";
import { removeUserFromFeed } from "../utils/feedSlice";


type User = {
  _id: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  about: string;
  interests: string[];
};

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {

  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRequest = async (status: string, userId: string) => {
    try {
      setIsSubmitting(true);
      await axios.post(
        `${API_BASE_URL}request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      // You could add a toast here later
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card  w-96 shadow-xl hover:shadow-2xl transition-shadow duration-200" data-theme="acid">
      <div className="px-6 pt-6 flex items-center gap-4">
        <div className="avatar">
          <div className="w-24 rounded-xl ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src={user.profilePicture}
              alt={`${user.firstName} ${user.lastName}`}
            />
          </div>
        </div>
        <div>
          <h2 className="card-title">
            {user.firstName} {user.lastName}
          </h2>
          {user && (
            <p className="text-sm text-base-content/70 line-clamp-2">
              {user.about}
            </p>
          )}
        </div>
      </div>
      <div className="card-body">
        <div>
          <span className="font-semibold">Interests</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {user &&
              user.interests.map((interest, idx) => (
                <span key={idx} className="badge badge-outline">
                  {interest}
                </span>
              ))}
          </div>
        </div>
        <div className="card-actions mt-4 justify-between">
          <button
            className="btn btn-ghost"
            disabled={isSubmitting}
            onClick={() => handleRequest('ignored', user._id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-primary"
            disabled={isSubmitting}
            onClick={() => handleRequest('interested', user._id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;