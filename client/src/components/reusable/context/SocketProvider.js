import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import AuthenticationContext from "../../login/AuthenticationContext";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}
export function SocketProvider({ children }) {
  const authContext = useContext(AuthenticationContext);
  const user = authContext.user;
  const [socket, setSocket] = useState();
  //   console.log("this PAge", user);

  useEffect(() => {
    if (!user?._id) return;
    console.log("inside socket");
    let id = user._id;
    const origin = window.location.origin;
    const host = origin.replace("http", "ws");
    const newSocket = io(host, { query: { id } });
    setSocket(newSocket);
    console.log("conected to socket", id);
    // console.log(socket.current);
  }, [user?._id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
