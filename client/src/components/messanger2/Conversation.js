import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";
import NameIcon from "./NameIcon";

export default function Conversation({ conversation }) {
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div style={{ border: "1px solid black" }}>
      {conversation?.members?.map((m) => {
        return <NameIcon name={m.label} key={m.value} />;
      })}
    </div>
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
