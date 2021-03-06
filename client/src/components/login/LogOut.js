import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationContext from "./AuthenticationContext";

const LogOut = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthenticationContext);

  console.log(authContext);

  useEffect(() => {
    fetch("/api/auth/logout").then(() => {
      authContext.logOut();
      console.log("Logged out successfully.");
      navigate("/login");
    });
  }, []);
  return "Hello";
};

export default LogOut;
