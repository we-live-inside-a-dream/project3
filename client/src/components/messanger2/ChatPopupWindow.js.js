import React from "react";
import { ChatButton, ChatPopup } from "./StyledMessangerPage";
import MessangerPage2 from "../../pages/common/MessangerPage2";
const ChatPopupWindow = () => {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <ChatButton onClick={() => setShow((prevCheck) => !prevCheck)}>
        x
      </ChatButton>
      <ChatPopup>
        <div className={show ? "popup show" : "popup"}>
          <MessangerPage2 />
        </div>
      </ChatPopup>
    </>
  );
};

export default ChatPopupWindow;
