import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { API_BASE_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import { showToast } from "../utils/toasterSlice";

const initForm: any = {
    username: '',
    password: '',
    rememberMe: false,
    gender: "Female",
    name: "",
    age: 18
};
// Login Form Component

const Login = () => {
    const [errors, setErrors]: any = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignIn, setIsSignIn] = useState(true);
    const genderOptions = ["Male", "Female", "Other"];
    const toaster = useSelector((state: any) => state.toaster);
    const [formData, setFormData] = useState(initForm);

    const handleInputChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev: any) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleInputChangeGender = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = (values: any) => {
        const errors: any = {};
        if (!isSignIn) {
            if (!values.name.trim()) {
                errors.name = "Name is required";
            }
            if (values.name.trim().length < 4) {
                errors.name = "Name must be at least 4 characters";
            }

            if (!values.age) {
                errors.age = "Age is required";
            } else if (!/^[0-9]+$/.test(values.age)) {
                errors.age = "Age must contain only numbers";
            } else if (parseInt(values.age, 10) < 18) {
                errors.age = "Age must be 18 or above";
            }

            if (!["Male", "Female", "Other"].includes(values.gender)) {
                errors.gender = "Invalid gender selected";
            }
        }

        if (!values.username.trim()) {
            errors.username = "Username is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.username)) {
            errors.username = "Enter a valid email address";
        }

        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }
        return errors;
    };

    const handleSignIn = async () => {
        try {
            // Replace with your actual API endpoint
            const firstName = formData.name.split(' ')[0];
            const lastName = formData.name.split(' ')[1] || "";

            const url = isSignIn ? `${API_BASE_URL}auth/login` : `${API_BASE_URL}auth/register`;
            const payload = isSignIn ? ({ email: formData.username, password: formData.password }) : (
                {
                    email: formData.username, password: formData.password,
                    firstName, lastName, age: formData.age, gender: formData.gender
                });

            const response: any = await axios.post(url, payload,
                { withCredentials: true },
            );
            // Handle successful login (e.g., redirect, save token, etc.)
            dispatch(addUser(response.data.user));
            dispatch(showToast({ message_type: "success", message: (isSignIn ? "Login successful!" : "Register successful") }));

            if (isSignIn) {
                navigate("/")
            } else {
                navigate("/login");
                handleIsSignIn();
            }


        } catch (err: any) {
            if (err.status !== 200) {
                dispatch(showToast({ message_type: "error", message: err.response.data.error || "Login failed. Please try again." }));
            }
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        // Simple validation
        const errorData = validate(formData)
        setErrors(errorData);
        // returns true if valid

        if (!isSignIn && !(Object.keys(errorData).length === 0)) {
            dispatch(showToast({ message_type: "error", message: "All * marked fields are mandatory" }));
            return;
        }
        if (isSignIn && !(Object.keys(errorData).length === 0)) {
            dispatch(showToast({ message_type: "error", message: "Invalid username or password" }));
            return;
        }

        handleSignIn();

        // Simulate login process
    };
    const handleIsSignIn = () => {
        setIsSignIn(prev => !prev);
        setErrors({});
        setFormData(initForm);
    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };



    return (
        <div className="hero min-h-screen mb-5">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card shrink-0 w-full max-w-md shadow-2xl glass-card slide-in pulse-glow">
                    <div className="card-body" data-theme="nord">
                        {/* Welcome Text */}
                        <div className="text-center mb-6">
                            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                            <p className="text-white/80">Sign in to your account to continue</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/***Additional field for Sign UP**/}
                            {!isSignIn && (<>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-white font-medium">Full name <span style={{ color: "red" }}>*</span></span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Enter your name"
                                            className="input input-bordered w-full bg-white/10 text-white placeholder-white/60 border-white/30 focus:border-white/60 pr-10"
                                            required
                                        />
                                    </div>
                                    {errors && errors.name && <p className="label-text" style={{ color: "red" }}>{errors.name}</p>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-white font-medium">Age(18+Only) <span style={{ color: "red" }}>*</span></span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="age"
                                            value={formData.age}
                                            onChange={handleInputChange}
                                            placeholder="Enter your Age(18+Only)"
                                            className="input input-bordered w-full bg-white/10 text-white placeholder-white/60 border-white/30 focus:border-white/60 pr-10"
                                            required
                                        />
                                    </div>
                                    {errors && errors.age && <p className="label-text" style={{ color: "red" }}>{errors.age}</p>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-white font-medium">Gender <span style={{ color: "red" }}>*</span></span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleInputChangeGender}
                                            className="select select-bordered w-full  text-white border-white/30 focus:border-white/60 pr-10"
                                            required
                                        >
                                            {genderOptions.map((option) => (
                                                <option key={option} value={option} className="text-black bg-gray-800 text-white" >
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors && errors.gender && <p className="label-text" style={{ color: "red" }}>{errors.gender}</p>}
                                </div>
                            </>)}

                            {/* Username Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-medium">Email(Username) <span style={{ color: "red" }}>*</span></span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        placeholder="Enter your email"
                                        className="input input-bordered w-full bg-white/10 text-white placeholder-white/60 border-white/30 focus:border-white/60 pr-10"
                                        required
                                    />
                                    <svg className="w-5 h-5 text-white/60 absolute right-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                {errors && errors.username && <p className="label-text" style={{ color: "red" }}>{errors.username}</p>}
                            </div>

                            {/* Password Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-medium">Password <span style={{ color: "red" }}>*</span></span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Enter your password"
                                        className="input input-bordered w-full bg-white/10 text-white placeholder-white/60 border-white/30 focus:border-white/60 pr-10"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-3.5 text-white/60 hover:text-white transition-colors"
                                    >
                                        {showPassword ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                    {errors && errors.password && <p className="label-text" style={{ color: "red" }}>{errors.password}</p>}
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}

                            <div className="flex items-center justify-between">
                                <label className="label cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="rememberMe"
                                        checked={formData.rememberMe}
                                        onChange={handleInputChange}
                                        className="checkbox checkbox-primary checkbox-sm"
                                    />
                                    <span className="label-text text-white/80 ml-2">{isSignIn ? "Remember me" : "I am accept all Terms and Conditions"}</span>
                                </label>
                                {isSignIn && (<a className="link link-primary text-sm">Forgot password?</a>
                                )}
                            </div>

                            {/* Login Button */}
                            <div className="form-control mt-6">
                                <button
                                    type="submit"
                                    className={`btn btn-primary w-full btn-gradient text-white font-semibold `}
                                    disabled={(toaster && toaster.message)}
                                >
                                    {(toaster && toaster.message) ? 'Signing In...' : 'Sign In'}
                                </button>
                            </div>

                            {/* Divider */}
                            <div className="divider text-white/60">Or continue with</div>

                            {/* Social Login Buttons */}
                            <div className="grid grid-cols-2 gap-3">
                                <button type="button" className="btn btn-outline border-white/30 text-white hover:bg-white/10">
                                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    Google
                                </button>
                                <button type="button" className="btn btn-outline border-white/30 text-white hover:bg-white/10">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                    Facebook
                                </button>
                            </div>
                        </form>

                        {/* Sign Up Link */}
                        <div className="text-center mt-6">
                            <p className="text-white/80">
                                {isSignIn ? "Don't have an account?" : "I have an account"}
                                <a onClick={() => handleIsSignIn()} className="link link-primary font-semibold ml-1">{isSignIn ? "Sign up" : "Sign in"}</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};
export default Login;