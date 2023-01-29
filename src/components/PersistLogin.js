import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import jwt_decode from "jwt-decode";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      const user = foundUser.user.username;
      const accessToken = foundUser.jwt;
      const ID = foundUser.user.id;
      const { exp } = jwt_decode(accessToken);
      console.log(exp);
      if (Date.now() >= exp * 1000) {
        navigate("/login");
        localStorage.clear();
      }
      // setUser(foundUser);
      setAuth({ user, ID, accessToken });
      setIsLoading(false);
    } else {
      navigate("/login", { replace: true });
      setIsLoading(false);
    }
  }, []);

  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
