import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => {
    setShowPassword(!showPassword);
  };

<<<<<<< Updated upstream
=======
  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        formData,
        {
          withCredentials: true
        }
      );
      console.log(response.data);
      setSuccess(true);

      // Hide success popup after 3 seconds and navigate to login
      setTimeout(() => {
        setSuccess(false);
        navigate("/login");
      }, 3000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

>>>>>>> Stashed changes
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left: Form Section */}
      <div className="w-full md:w-[40%] flex items-center justify-center bg-white p-8 md:p-16">
        <div className="max-w-md w-full space-y-6">
          {/* Logo */}
          <h1 className="text-3xl font-semibold text-gray-800">Healicious</h1>

          {/* Welcome Text */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Create Account</h2>
            <p className="text-gray-500 text-sm">
              Register to get started with your healthy journey.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

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

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
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

            {/* Show Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="text-green-600 mr-2"
                  onChange={handleToggle}
                />
                Show Password
              </label>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition"
            >
              Register
            </button>

            {/* Already Have Account */}
            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-green-600 font-medium hover:underline">
                Sign In
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

export default Signup;
