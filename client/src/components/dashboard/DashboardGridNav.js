import React, { useContext } from "react";
import ScheduleBox from "./ScheduleBox";
import MessagesBox from "./MessagesBox";
import AnnouncementsBox from "./AnnouncementsBox";
import { CalendarBox } from "./CalendarBox";
import HumanResourcesBox from "./HumanResourcesBox";
import FilesBox from "./FilesBox";
import UpcomingShiftsBox from "./UpcomingShiftsBox";
import AuthenticationContext from "../login/AuthenticationContext";
import TimeOffBox from "./TimeOffBox";
import { useNavigate } from "react-router-dom";
import ApprovalsBox from "./ApprovalsBox";
import SettingsBox from "./SettingsBox";
import HelpBox from "./HelpBox";

let dashGridStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-around",
  alignContent: "flex-start",
  rowGap: "30px",
  width: "85%",
  height: "auto",
  margin: "50px auto",
};

const DashboardGridNav = function () {
  const authContext = useContext(AuthenticationContext);
  const navigate = useNavigate();
  //repeat autofill 30%
  return (
    <div style={dashGridStyle}>
      <ScheduleBox />
      {authContext?.user?.permissions?.includes("manager") ||
      authContext?.user?.permissions?.includes("admin") ? (
        <HumanResourcesBox />
      ) : null}
      <UpcomingShiftsBox />
      <TimeOffBox onClick={() => navigate("/timeOff/page")} />
      <CalendarBox />
      <ApprovalsBox />
      <MessagesBox />
      <SettingsBox />
      <HelpBox />

      {/* {authContext?.user?.permissions?.includes("manager") ||
      authContext?.user?.permissions?.includes("admin") ? (
        <FilesBox />
      ) : null}{" "}
       */}
    </div>
  );
};

export default DashboardGridNav;
