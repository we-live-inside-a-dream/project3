import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthenticationContext from "./AuthenticationContext";

const Manager = ({ children }) => {
  const authContext = useContext(AuthenticationContext);
  console.log(authContext);
  if (
    authContext?.user?.permissions?.includes("manager") ||
    authContext?.user?.permissions?.includes("admin")
  ) {
    return children;
  } else if (!authContext.user) {
    return <Navigate to="/" />;
  } else return null;
};

export default Manager;
