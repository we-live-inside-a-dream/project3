import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationContext from "./AuthenticationContext";

const LogOut = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthenticationContext);

  console.log(authContext);

  useEffect(() => {
    fetch(process.env.REACT_APP_ELECTRON_SERVER+"/api/auth/logout").then(() => {
      authContext.logOut();
      console.log("Logged out successfully.");
      navigate("/");
    });
  }, []);
  return "Hello";
};

export default LogOut;
