import React, { useContext, useState, useEffect } from "react";
import ScheduleBox from "./ScheduleBox";
import MessagesBox from "./MessagesBox";
import AnnouncementsBox from "./AnnouncementsBox";
import { CalendarBox } from "./CalendarBox";
import HumanResourcesBox from "./HumanResourcesBox";
import FilesBox from "./FilesBox";
import UpcomingShiftsBox from "./UpcomingShiftsBox";
import AuthenticationContext from "../login/AuthenticationContext";
import { useManagerSettings } from "../../components/reusable/context/ManagerSettingsProvider";
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
  paddingBottom: "60px",
};

const DashboardGridNav = function () {
  const authContext = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const [perms, setPerms] = useState();
  const value = useManagerSettings();
  const user = authContext.user;

  useEffect(() => {
    if (user) {
      let allPermissions = value.permissions;
      setPerms(allPermissions);
    }
  }, [value.permissions, user]);

  return (
    <>
      {!perms && "Loading..."}
      {perms && (
        <div style={dashGridStyle}>
          {perms?.scheduleView === true ? <ScheduleBox /> : null}
          {/* {user?.permissions === "manager" ||
          user?.permmissions === "administator" ? (
            <HumanResourcesBox />
          ) : null} */}
          {perms?.employeeProfileEdit === true ? <HumanResourcesBox /> : null}
          {perms?.scheduleView === true ? <UpcomingShiftsBox /> : null}
          {perms?.scheduleView === true ? (
            <TimeOffBox onClick={() => navigate("/timeOff/page")} />
          ) : null}
          {perms?.scheduleView === true ? <CalendarBox /> : null}
          {perms?.shiftSwapView === true ? <ApprovalsBox /> : null}
          {perms?.scheduleView === true ? <MessagesBox /> : null}
          {perms?.appSettingsView === true ? <SettingsBox /> : null}
          <HelpBox />
        </div>
      )}
    </>
  );
};

export default DashboardGridNav;
