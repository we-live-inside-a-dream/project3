import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogOut = ({ setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/auth/logout").then(() => {
      setUser(null);
      navigate("/");
    });
  }, []);
  return null;
};

export default LogOut;
