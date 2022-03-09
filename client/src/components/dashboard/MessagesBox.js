import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardBoxScaleImage from "./DashboardBoxScaleImage";
import MessageBubble from "./messageBubble.png";

function MessagesBox() {
  let navigate = useNavigate();

  return (
    <>
      <DashboardBoxScaleImage
        title="MESSAGES"
        padding="5px"
        top={0}
        left={0}
        transform={"Scale(1)"}
        transformOrigin={"top left"}
        clickFunction={() => navigate("/chat")}
        image={MessageBubble}
        picStyle={{ width: "200px", marginLeft: "30px" }}
        alt="message icon"
      />
    </>
  );
}

export default MessagesBox;
