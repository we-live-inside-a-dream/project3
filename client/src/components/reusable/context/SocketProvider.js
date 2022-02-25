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
  const [unread, setUnread] = useState();
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

  // useEffect(() => {

  //   if (socket == null) return;
  //   socket.on("getMessage", (data) => {
  //     console.log("get message...", data);
  //     setArrivalMessage({
  //       sender: data.sender,
  //       text: data.text,
  //       createdAt: Date.now(),
  //     });
  //     fetchMsgs();
  //   });
  // }, [socket]);

  async function fetchUnread() {
    if (!user?._id) return;
    let fetchResult = await fetch(`/api/messages/unread?id=${user._id}`);
    let fetchedUnread = await fetchResult.json();
    console.log(fetchedUnread);
    setUnread(fetchedUnread);
  }

  useEffect(() => {
    if (socket == null) return;
    fetchUnread(); //fetch on load
    socket.on("getUnread", async (recipient) => {
      if (recipient.recipient !== user._id) return;
      fetchUnread(); // fetch on new message
    });
  }, [socket, user?._id]);

  useEffect(() => {
    console.log("unread", unread);
  }, [unread]);

  const value = {
    socket,
    unread,
    fetchUnread,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}
