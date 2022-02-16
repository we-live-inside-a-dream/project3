import React, { useEffect, useState } from "react";
import AuthenticationContext from "./AuthenticationContext";

const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState({ loading: true });
  const logIn = (logInUser) => {
    // console.log(logInUser);
    setUser(logInUser);
  };

  useEffect(() => {
    const getLoggedInUser = async () => {
      const response = await fetch("/api/auth/loggedInUser");
      if (response.status === 200) {
        const loggedInUser = await response.json();
        // console.log(loggedInUser);
        if (loggedInUser) {
          logIn(loggedInUser);
        } else {
          setUser(null);
        }
      }
    };
    getLoggedInUser();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);
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
