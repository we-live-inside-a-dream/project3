import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardBoxScaleImage from "./DashboardBoxScaleImage";
import Gears from "./settingsGears.png";

function ScheduleBox() {
  let navigate = useNavigate();

  return (
    <>
      <DashboardBoxScaleImage
        padding="20px"
        top={0}
        left={0}
        transform={"Scale(1)"}
        transformOrigin={"top left"}
        title="SETTINGS"
        clickFunction={() => navigate("/ManagerSettingsPage")}
        // content={Gears}
        image={Gears}
        alt="setting gear icon"
        picStyle={{ width: "100%" }}
      />
    
    </>
  );
}

export default ScheduleBox;
