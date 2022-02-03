import { useContext } from "react";
import AuthenticationContext from "./AuthenticationContext";

const MustBeLoggedIn = ({ children }) => {
  const authContext = useContext(AuthenticationContext);
  return authContext.user ? children : null;
};

export default MustBeLoggedIn;
