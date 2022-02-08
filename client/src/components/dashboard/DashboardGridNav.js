import React from "react";
import ScheduleBox from "./ScheduleBox";
import MessagesBox from "./MessagesBox";
import AnnouncementsBox from "./AnnouncementsBox";
import { CalendarBox } from "./CalendarBox";
import HumanResourcesBox from "./HumanResourcesBox";
import FilesBox from "./FilesBox";
import UpcomingShiftsBox from "./UpcomingShiftsBox";

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
  //repeat autofill 30%
  return (
    <div style={dashGridStyle}>
      <ScheduleBox />
      <CalendarBox />
      <UpcomingShiftsBox />
      <HumanResourcesBox />
      <MessagesBox />
      <AnnouncementsBox />
      <ScheduleBox />
      <FilesBox />
    </div>
  );
};

export default DashboardGridNav;
