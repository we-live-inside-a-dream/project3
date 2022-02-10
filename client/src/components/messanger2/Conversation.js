import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";
import NameIcon from "./NameIcon";

export default function Conversation({ conversation, currentUser }) {
  // const [recipients, setRecipients] = useState(null);
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // useEffect(() => {
  //   const friendId = conversation.members.find((m) => m !== currentUser._id);
  //   const getRecipients = async () => {
  //     try {
  //       const res = await axios("api/employeeProfile/getByProfileId/" + friendId);
  //       setRecipients(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getRecipients();
  // }, [currentUser, conversation]);

  // useEffect(() => {

  //     const getConversations = async () => {
  //       let fetchResult = await fetch("api/conversations/" + user._id);
  //       let fetchedConversation = await fetchResult.json();
  //       console.log("fetched Convo", fetchedConversation);
  //       setConversations(fetchedConversation);
  //     };
  //     getConversations();
  //   }

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
