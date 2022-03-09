import React from "react";
import { ChatButton, ChatPopup, MessageLogo } from "./StyledMessangerPage";
import MessangerPage2 from "../../pages/common/MessangerPage2";
import { useSocket } from "../../components/reusable/context/SocketProvider";
import msgIcon from "./chat.png";
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
        <MessageLogo src={msgIcon} />
      </ChatButton>
      {unread?.length > 0 ? (
        <div
          style={{
            height: "25px",
            width: "25px",
            borderRadius: "50%",
            backgroundColor: "red",
            position: "fixed",
            transformOrigin: "topRight",
            bottom: "5.5em",
            right: "3em",
            pointerEvents: "none",
            // opacity: "75%",
            zIndex: "101",
          }}
        />
      ) : null}
    </>
  );
};

export default ChatPopupWindow;
