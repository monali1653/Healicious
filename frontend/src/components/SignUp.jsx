import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showAvatarPopup, setShowAvatarPopup] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNo: "",
    password: "",
    avatar: "", // added avatar field
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle password visibility
  const handleToggle = () => {
    setShowPassword(!showPassword);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        formData,
        { withCredentials: true }
      );
      console.log("✅ Registration successful:", response.data);
      setSuccess(true);

      // Redirect to login after success
      setTimeout(() => {
        setSuccess(false);
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("❌ Registration error:", err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section - Form */}
      <div className="w-full md:w-[40%] flex items-center justify-center bg-white p-8 md:p-16">
        <div className="max-w-md w-full space-y-6">
          <h1 className="text-3xl font-semibold text-gray-800">Healicious</h1>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Create Account</h2>
            <p className="text-gray-500 text-sm">
              Register to get started with your healthy journey.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                required
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
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="johndoe123@xyz.com"
                required
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
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                placeholder="+91 98765 43210"
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

            {/* Show Password Checkbox */}
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

            {/* Avatar Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Avatar (Optional)
              </label>

              {/* Avatar Preview & Select Button */}
              <div className="flex items-center space-x-3">
                {formData.avatar ? (
                  <img
                    src={formData.avatar}
                    alt="Selected Avatar"
                    className="w-12 h-12 rounded-full border"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full border flex items-center justify-center text-gray-400">
                    No Avatar
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setShowAvatarPopup(true)}
                  className="text-sm text-green-600 hover:underline"
                >
                  Select Avatar
                </button>
              </div>

              {/* Avatar Popup */}
              {showAvatarPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 shadow-lg w-80 relative">
                    <button
                      type="button"
                      onClick={() => setShowAvatarPopup(false)}
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Choose an Avatar
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        "/images/avatar1.jpg",
                        "/images/avatar2.jpg",
                        "/images/avatar3.jpg",
                        "/images/avatar4.jpg",
                        "/images/avatar5.jpg",
                        "/images/avatar6.jpg",
                      ].map((avatar, index) => (
                        <img
                          key={index}
                          src={avatar}
                          alt={`Avatar ${index + 1}`}
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, avatar }));
                            setShowAvatarPopup(false);
                          }}
                          className="w-16 h-16 rounded-full border cursor-pointer hover:ring-2 hover:ring-green-500"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Error / Success Messages */}
            {error && <p className="text-red-600 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">Registration successful!</p>}

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md font-semibold text-white transition ${
                loading
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Registering..." : "Register"}
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

      {/* Right Section - Image */}
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

export default Signup;
