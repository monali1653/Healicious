import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios"

const RefreshHandler = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/users/me",{
        withCredentials: true
      })
      .then((res) => {
        const user = res.data;
        setIsAuthenticated(user);
        if (location.pathname === "/login" || location.pathname === "/signup") {
          navigate("/", { replace: true });
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
        if (location.pathname !== "/login" && location.pathname !== "/signup") {
          navigate("/", { replace: true });
        }
      });
  }, [location.pathname, navigate, setIsAuthenticated]);

  return null;
};

export default RefreshHandler;