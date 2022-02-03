import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthenticationContext from "./AuthenticationContext";

const MustBeManager = ({ children }) => {
  const authContext = useContext(AuthenticationContext);
  if (authContext.user.positions.includes("manager")) {
    return children;
  } else if (!authContext.user) {
    return <Navigate to="/login" />;
  } else return <Navigate to="/" />;
};

export default MustBeManager;
