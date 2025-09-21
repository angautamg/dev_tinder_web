import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import UserCard from "./UserCard";

const Profile = () => {
  const user = useSelector((state: any) => state.user);

  return (
    <div className="min-h-screen bg-base-200 flex flex-col md:flex-row gap-8 p-8 justify-center items-start">
      <div>
        {user && <UserCard user={user} />}
      </div>
      <div className="flex-1">
        {user ? (
          <EditProfile user={user} />
        ) : (
          <span className="text-lg text-gray-500">No user data available.</span>
        )}
      </div>
    </div>
  );
};

export default Profile;