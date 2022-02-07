import React, { useEffect, useState } from "react";
import AuthenticationContext from "./AuthenticationContext";

const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState();
  const logIn = (logInUser) => {
    // console.log(logInUser);
    setUser(logInUser);
  };

  useEffect(() => {
    const getLoggedInUser = async () => {
        const response = await fetch('/api/auth/loggedInUser')
        console.log(response,"11111111")
        const loggedInUser = await response.json()
        console.log(loggedInUser)
        if (loggedInUser) {
            logIn(loggedInUser)
        }
    }
    getLoggedInUser()
}, [])

  useEffect(()=>{
    console.log(user)
  },[user])
  const logOut = () => {
    setUser(null);
  };
  const authContext = { user, logIn, logOut};
  return (
    <AuthenticationContext.Provider value={authContext}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
