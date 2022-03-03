import React from "react";
import { ChatButton, ChatPopup, MessageLogo } from "./StyledMessangerPage";
import MessangerPage2 from "../../pages/common/MessangerPage2";
import { useSocket } from "../../components/reusable/context/SocketProvider";
import msgIcon from "./messageIcon.png";
import { useEffect } from "react";

const ChatPopupWindow = () => {
  const [show, setShow] = React.useState(false);
  const value = useSocket();
  const unread = value.unread;

  // useEffect(() => {
  //   console.log("show", show);
  // }, [show]);
  return (
    <>
      <ChatPopup>
        <div className={show ? "popup show" : "popup"}>
          <MessangerPage2 show={show} />
        </div>
      </ChatPopup>
      <ChatButton onClick={() => setShow((prevCheck) => !prevCheck)}>
        <MessageLogo src={msgIcon} />x
      </ChatButton>
      {unread?.length > 0 ? (
        <div
          style={{
            height: "10px",
            width: "10px",
            borderRadius: "50%",
            backgroundColor: "red",
            position: "fixed",
            transformOrigin: "topRight",
            bottom: "5em",
            right: "3em",
            zIndex: "101",
          }}
        />
      ) : null}
    </>
  );
};

export default ChatPopupWindow;
