import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../utils/constant";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      // Implement logout functionality here
      await axios.post(`${API_BASE_URL}auth/logout`,
        {},
        {
          withCredentials: true

        });
      dispatch(removeUser());
      return navigate('/login');

    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  return (
    <div className="navbar bg-base-200 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
      </div>
      <div className="flex gap-2">
        <input type="text" placeholder="Search" className="input input-bordered w-18 md:w-auto" />
       {!user && (
          <Link to="/login" className="btn btn-outline btn-primary ml-2">
            Login
          </Link>
        )}
        {user && (
          <span className="ml-4 text-lg font-semibold text-primary">Welcome, {user.firstName}</span>
        )}
        {user && (<div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Profile picture"
                src={user.profilePicture} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link to="/connection" className="justify-between">
                Connections
              </Link>
            </li>
            <li><a>Settings</a></li>
            <li><a onClick={handleLogout}>Logout</a></li>
          </ul>
        </div>)}
      </div>
    </div>
  );
};
export default Navbar;