import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import {Menubar}   from "./Menubar";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import axios from "axios"; // ✅ make sure this path is correct

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Add Yours", path: "/recipe" },
  ];

  // ✅ Fetch user info when authenticated
  useEffect(() => {
    if (!isAuthenticated) return setUser(null);
    axios
      .get("http://localhost:8000/api/v1/users/myprofile", {
      withCredentials: true
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

  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="flex items-center justify-between px-6 md:px-16 py-4">
        {/* --- Logo Section --- */}
        <div className="flex items-center space-x-2">
          <img

            src="/images/logo.jpg"
            alt="Logo"
            className="w-8 h-8 object-contain"
          />
          <h1 className="text-lg font-semibold text-gray-800">Healicious</h1>
        </div>

        {/* --- Desktop Menu --- */}
        <div className="hidden md:flex items-center space-x-10 text-gray-600 font-medium">
          <ul className="flex space-x-10">
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

          {/* --- Right side (auth) --- */}
          {isAuthenticated ? (
            <div className="ml-4">
              <Menubar user={user} onLogout={handleLogout} />
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 border-2 border-yellow-500 px-3 py-1 rounded-full font-semibold text-sm hover:bg-yellow-100 transition"
            >
              <span>Log In</span> <FaUser />
            </button>
          )}
        </div>

        {/* --- Mobile Menu Button --- */}
        <button
          className="md:hidden text-gray-700 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* --- Mobile Dropdown Menu --- */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-100">
          <ul className="flex flex-col items-center space-y-4 py-4 text-gray-700 font-medium">
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

            {/* --- Auth section for mobile --- */}
            <li>
              {isAuthenticated ? (
                <Menubar user={user} onLogout={handleLogout} />
              ) : (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/login");
                  }}
                  className="flex items-center gap-2 border-2 border-yellow-500 px-3 py-1 rounded-full font-semibold text-sm hover:bg-yellow-100 transition"
                >
                  <span>Log In</span> <FaUser />
                </button>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default Navbar;