import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row w-full bg-gray-50 py-10 px-6 md:px-12 gap-6">
      {/* Left Section with Full Image */}
      <div className="relative w-full md:w-1/3 rounded-2xl overflow-hidden shadow-md">
        <img
          src="/images/healthy-meal.jpg" // replace with your image path
          alt="Healthy meal"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Section */}
      <div className="w-full md:w-2/3 flex flex-col rounded-2xl overflow-hidden shadow-md">
        {/* Top White Section */}
        <div className="bg-white p-6 md:p-10 flex flex-col gap-4">
          {/* Logo + Title */}
          <div className="flex items-center gap-3">
            <img
              src="/images/logo.jpg"
              alt="Healicious Logo"
              className="w-8 sm:w-10 h-auto max-h-10 object-contain"
            />
            <h2 className="text-3xl font-extrabold">
              <span className="text-gray-800">HEAL</span>
              <span className="text-yellow-500">ICIOUS</span>
            </h2>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm md:text-base">
            Join Healicious now and embark on a healthy culinary journey
            to explore, create, and savor nutritious recipes!
          </p>

         
        </div>

        {/* Bottom Black Section */}
        <div className="bg-black text-white p-8 md:p-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            {/* Company */}
            <div>
              <h3 className="font-semibold mb-2">Company</h3>
              <ul className="space-y-1 text-gray-400">
                <li>About Us</li>
                <li>Our Stories</li>
                <li>Work with Us</li>
                <li>User Testimonials</li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold mb-2">Support</h3>
              <ul className="space-y-1 text-gray-400">
                <li>FAQ</li>
                <li>Membership</li>
                <li>User Policy</li>
                <li>Customer Support</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-2">Contact</h3>
              <ul className="space-y-1 text-gray-400">
                <li>Phone Number</li>
                <li>Email Address</li>
                <li>Social Media</li>
                <li>Company Location</li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-700 mt-6 pt-4 text-xs text-gray-500 flex flex-col sm:flex-row justify-between">
            <p>Copyright © 2025 Healicious.</p>
            <p>Privacy Policy | Terms and Conditions</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
