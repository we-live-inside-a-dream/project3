import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardBoxScaleImage from "./DashboardBoxScaleImage";
import nicerQuestion from "./nicerQuestion.png";
// import EmployeeUpcomingShiftList from "./EmployeeUpcomingShiftList";

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
        title="HELP/INSTRUCTIONS"
        clickFunction={() => navigate("/help")}
        image={nicerQuestion}
        alt="question mark for help"
        picStyle={{ height: "180px", marginLeft: "60px" }}
      />
    </>
  );
}

export default ScheduleBox;
