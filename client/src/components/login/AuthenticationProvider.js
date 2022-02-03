import React, { useState } from "react";
import AuthenticationContext from "./AuthenticationContext";

const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const logIn = (logInUser) => {
    console.log(logInUser);
    setUser(logInUser);
  };
  const logOut = () => {
    setUser(null);
  };
  const authContext = { user, logIn, logOut };
  return (
    <AuthenticationContext.Provider value={authContext}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
