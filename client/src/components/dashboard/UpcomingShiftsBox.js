import React from "react";
import DashboardBoxScale from "./DashboardBoxScale";
import { useNavigate } from "react-router-dom";

function UpcomingShiftsBox() {
  let navigate = useNavigate();
  let content = "";
  return (
    <div>
      <DashboardBoxScale
        title="MY UPCOMING SHIFTS"
        clickFunction={() => navigate("/my-page")}
        content={content}
      />
    </div>
  );
}

export default UpcomingShiftsBox;
