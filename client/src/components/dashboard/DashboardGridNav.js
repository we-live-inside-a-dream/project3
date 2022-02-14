import React, { useContext } from "react";
import ScheduleBox from "./ScheduleBox";
import MessagesBox from "./MessagesBox";
import AnnouncementsBox from "./AnnouncementsBox";
import { CalendarBox } from "./CalendarBox";
import HumanResourcesBox from "./HumanResourcesBox";
import FilesBox from "./FilesBox";
import UpcomingShiftsBox from "./UpcomingShiftsBox";
import AuthenticationContext from "../login/AuthenticationContext";

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
  //repeat autofill 30%
  return (
    <div style={dashGridStyle}>
      <ScheduleBox />
      {authContext?.user?.positions?.includes("manager") && (
        <HumanResourcesBox />
      )}
      <UpcomingShiftsBox />
      <CalendarBox />
      <MessagesBox />
      <AnnouncementsBox />
      <FilesBox />
    </div>
  );
};

export default DashboardGridNav;
