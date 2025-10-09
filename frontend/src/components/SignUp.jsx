import React from "react";

const Signup = () => {
  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="hidden md:flex md:w-1/2 bg-green-100 items-center justify-center">
        {/* Space for Image */}
        <img
          src="/images/clip3.png"
          alt="Signup Illustration"
          className="w-3/4 h-auto"
        />
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center ">
        <div className="max-w-md w-full p-6">
          <h2 className="text-2xl font-bold text-center mb-6">
            Please Create an Account
          </h2>

          {/* Signup Form */}
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="tel"
              placeholder="Phone"
              className="w-full p-3 rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition"
            >
              Register
            </button>
          </form>

          {/* Footer text */}
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-green-700 font-medium hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
