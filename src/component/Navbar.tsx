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

                <div className="navbar glass-card border-b border-white/20 px-6">
                    <div className="navbar-start">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center floating-animation">
                                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                             <Link to="/" className="btn btn-ghost text-xl"><span className="text-white font-bold text-xl">ModernApp</span>
                             </Link>
                            
                        </div>
                    </div>
                    
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 space-x-4">
                            <li> <Link to="/" className="text-white menu-hover">Home</Link></li>
                            <li><Link to="/about" className="text-white menu-hover">About</Link></li>
                            <li><Link to="/dashboard" className="text-white menu-hover">Dashboard</Link></li>
                        </ul>
                    </div>
                    
                    <div className="navbar-end space-x-4">
                        {/* Search Field */}
                        <div className="form-control">
                            <div className="input-group">
                                <input 
                                    type="text" 
                                    placeholder="Search..." 
                                    className="input input-bordered bg-white/20 text-white placeholder-white/70 border-white/30 focus:border-white/50 w-48"
                                />
                                <button className="btn btn-square bg-white/20 border-white/30 hover:bg-white/30">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* User Avatar */}
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                                        {user && (<img alt="Profile picture"  src={user.profilePicture} />)}
                                    </div>
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-999 p-2 shadow bg-base-100 rounded-box w-52">
                                {user && ( <li>  <Link to="/profile">Profile</Link></li>)}
                                {user && ( <li>  <Link to="/connection">Connection</Link></li>)}
                                <li>
                                    {user && (<a onClick={handleLogout}>Logout</a>)}
                                    {!user && (<Link to="/login">Login</Link>)}
                                </li>
                            </ul>
                        </div>

                        {/* Mobile Menu */}
                        <div className="dropdown lg:hidden">
                            <div tabIndex={0} role="button" className="btn btn-ghost">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                                </svg>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-999 p-2 shadow bg-base-100 rounded-box w-52">
                                <li><Link to="/" className="text-white menu-hover">Home</Link></li>
                                <li><Link to="/about" className="text-white menu-hover">About</Link></li>
                                <li><Link to="/dashboard" className="text-white menu-hover">Dashboard</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            );
        
  
};
export default Navbar;