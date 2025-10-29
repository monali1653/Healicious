import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import {Menubar}   from "./Menubar";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import axios from "axios"; 

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Add Yours", path: "/recipe" },
  ];
  useEffect(() => {
    if (!isAuthenticated) return setUser(null);
    axios
      .get("http://localhost:8000/api/v1/users/myprofile", {
        withCredentials: true,
      })
      .then((res) => setUser(res.data.data))
      .catch((err) => console.error("Fetch user failed:", err));
  }, [isAuthenticated]);

  // ✅ Logout handler
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/api/v1/users/logout",{}, {
        withCredentials: true
      });
      Cookies.remove("token");
      setIsAuthenticated(false);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // ✅ Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);
  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      {/* --- Main Navbar Row --- */}
      <div className="flex items-center justify-between px-6 md:px-16 py-4">
        {/* --- Left: Hamburger (Mobile Only) --- */}
        <button
          className="text-gray-700 text-2xl md:hidden"
          onClick={() => setMenuOpen(true)}
        >
          <FiMenu />
        </button>

        {/* --- Left (Logo) --- */}
        <div className="flex items-center space-x-2">
          <img
            src="/images/logo.jpg"
            alt="Logo"
            className="w-8 h-8 object-contain"
          />
          <h1 className="text-lg font-semibold text-gray-800">Healicious</h1>
        </div>
        {/* --- Right: Nav Links (Desktop) + Avatar --- */}
        <div className="flex items-center space-x-8">
          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center space-x-8 text-gray-600 font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`transition duration-300 ${
                    location.pathname === link.path
                      ? "text-yellow-500 font-semibold"
                      : "hover:text-yellow-500"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* User Avatar */}
          {isAuthenticated && <Menubar user={user} onLogout={handleLogout} />}
        </div>
      </div>

      {/* --- Overlay for mobile sidebar --- */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 transition-opacity duration-300"></div>
      )}

      {/* --- Mobile Sidebar (Slide-in from Left) --- */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-2/3 max-w-xs bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-2xl text-gray-700"
          >
            <FiX />
          </button>
        </div>

        <ul className="flex flex-col mt-6 space-y-4 px-6 text-gray-700 font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`block transition duration-300 ${
                  location.pathname === link.path
                    ? "text-yellow-500 font-semibold"
                    : "hover:text-yellow-500"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default Navbar;
