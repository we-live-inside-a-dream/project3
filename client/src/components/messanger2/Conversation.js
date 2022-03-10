import axios from "axios";
import { useEffect, useState, useContext } from "react";
import AuthenticationContext from "../login/AuthenticationContext";
import "./conversation.css";
import NameIcon from "./NameIcon";
import { useSocket } from "../../components/reusable/context/SocketProvider";
import { StyledConverstion } from "./StyledMessangerPage";

export default function Conversation({ id, conversation }) {
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const value = useSocket();
  let read = value.unread;

  let imageUrl = function (name) {
    let nameArray = name.split(" ");
    let first = nameArray[0];
    let url = `${first.toLowerCase()}.jpg`;
    return url;
  };

  return (
    <>
      <StyledConverstion>
        {/* <div style={{ border: "1px solid black", position: "relative" }}> */}
        {conversation?.members?.map((m) => {
          if (m.value !== id)
            return (
              <NameIcon
                imageUrl={imageUrl(m.label)}
                name={m.label}
                key={m.value}
              />
            );
        })}

        {read?.includes(conversation._id) ? (
          <div
            style={{
              height: "10px",
              width: "10px",
              borderRadius: "50%",
              backgroundColor: "red",
              position: "absolute",
              // transformOrigin: "topRight",
              top: "1em",
              right: "1em",
              zIndex: 1001,
            }}
          />
        ) : null}
      </StyledConverstion>
      {/* </div> */}
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
