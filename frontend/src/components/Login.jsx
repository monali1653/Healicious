import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({setIsAuthenticated}) => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  // Handle toggle
  const handleToggle = () => {
    setShowPassword(!showPassword);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        formData,
        {
          withCredentials: true
        }
      );
      console.log(response.data);
      setIsAuthenticated(true);

      setSuccess(true);

      // Navigate to home after 2 seconds
      setTimeout(() => {
        setSuccess(false);
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left: Form Section */}
      <div className="w-full md:w-[40%] flex items-center justify-center bg-white p-8 md:p-16">
        <div className="max-w-md w-full space-y-6">
          {/* Logo */}
          <h1 className="text-3xl font-semibold text-gray-800">Healicious</h1>

          {/* Welcome Text */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Welcome Back</h2>
            <p className="text-gray-500 text-sm">
              Sign in with your email address and password.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="johndoe123@xyz.com"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Remember Me + Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="text-green-600 mr-2"
                  onChange={handleToggle}
                />
                Show Password
              </label>
              <a href="#" className="text-green-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition"
            >
              Sign In
            </button>

            {/* Sign Up Link */}
            <p className="text-sm text-center text-gray-600">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-green-600 font-medium hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right: Image Section */}
      <div className="w-full md:w-[60%] flex items-center justify-center bg-gray-100">
        <img
          src="/images/log.jpg" // Replace with your image path
          alt="Healthy meal"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
