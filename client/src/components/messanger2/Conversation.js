import axios from "axios";
import { useEffect, useState, useContext } from "react";
import AuthenticationContext from "../login/AuthenticationContext";
import "./conversation.css";
import NameIcon from "./NameIcon";
import { useSocket } from "../../components/reusable/context/SocketProvider";

export default function Conversation({ unread, conversation }) {
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // const socket = useSocket();
  // const [unread, setUnread] = useState();
  // const authContext = useContext(AuthenticationContext);
  // let user = authContext.user;

  // useEffect(() => {
  //   // if (!socket) return;
  //   // socket.on("getUnread", () => {
  //   console.log("here");

  //   const fetchMsgs = async () => {
  //     let fetchResult = await fetch(`/api/messages/unread?id=${user?._id}`);
  //     let fetchedUnread = await fetchResult.json();

  //     setUnread(fetchedUnread);
  //   };
  //   fetchMsgs();
  //   // });
  // }, [socket, user._id]);

  useEffect(() => {
    console.log("unread", unread);
  }, [unread]);

  return (
    <>
      <div style={{ border: "1px solid black", position: "relative" }}>
        {conversation?.members?.map((m) => {
          return <NameIcon name={m.label} key={m.value} />;
        })}

        {unread?.includes(conversation._id) ? (
          <div
            style={{
              height: "10px",
              width: "10px",
              borderRadius: "50%",
              backgroundColor: "red",
              position: "absolute",
              transformOrigin: "topRight",
              top: "1em",
              right: "1em",
            }}
          />
        ) : null}
      </div>
    </>
    //   <div className="conversation">
    //     {conversation?.map((c) => {
    //       return <p>{c}</p>;
    //     })}
    // {
    /* <img
        className="conversationImg"
        src={
          user?.profilePicture
            ? PF + user.profilePicture
            : PF + "person/noAvatar.png"
        }
        alt=""
      /> */
    // }
    // {
    /* <span className="conversationName">{user?.firstName}</span> */
    // }
    //     </div>
  );
}
