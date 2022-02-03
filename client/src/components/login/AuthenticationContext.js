import React, { createContext } from "react";

const AuthenticationContext = createContext({
  username: "",
  logIn: () => {},
  logOut: () => {},
});

export default AuthenticationContext;
