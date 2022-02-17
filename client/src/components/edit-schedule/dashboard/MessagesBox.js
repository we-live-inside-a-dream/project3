import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardBox from "./DashboardBox";
import MessangerPage2 from "../../pages/common/MessangerPage2";

function MessagesBox() {
  let navigate = useNavigate();

  return (
    <>
      <DashboardBox
        title="MESSAGES"
        padding="5px"
        top={0}
        left={0}
        transform={"Scale(.3)"}
        transformOrigin={"top left"}
        clickFunction={() => navigate("/chat")}
        content={<MessangerPage2 />}
      />
    </>
  );
}

export default MessagesBox;
