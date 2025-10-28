import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle password visibility
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
        { withCredentials: true }
      );

      console.log(response.data);
      setIsAuthenticated(true);
      setSuccess(true);

      // Redirect after short delay
      setTimeout(() => {
        navigate("/");
      }, 1500);
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
          <h1 className="text-3xl font-semibold text-gray-800">Healicious</h1>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Welcome Back</h2>
            <p className="text-gray-500 text-sm">
              Sign in with your email address and password.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="johndoe123@xyz.com"
                required
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
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Show Password + Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={handleToggle}
                  className="text-green-600 mr-2"
                />
                Show Password
              </label>
              <a href="#" className="text-green-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Error or Success Messages */}
            {error && <p className="text-red-600 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">Login successful!</p>}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Signing In..." : "Sign In"}
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
          src="/images/log.jpg"
          alt="Healthy meal"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
