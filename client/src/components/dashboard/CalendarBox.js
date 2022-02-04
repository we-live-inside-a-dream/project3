import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardBoxScale from "./DashboardBoxScale";

// import MonthSchedulePage from "../../pages/manager/MonthSchedulePage";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StyledScaledComponent from "./StyledScaledContent";

export const CalendarWidget = function () {
  const [value, setValue] = useState("");
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        readOnly={true}
        orientation="landscape"
        label="Week picker"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        // renderDay={renderWeekPickerDay}
        renderInput={(params) => <TextField {...params} />}
        inputFormat="'Week of' MMM d"
      />
    </LocalizationProvider>
  );
};

export const CalendarBox = function () {
  let navigate = useNavigate();

  return (
    <>
      <DashboardBoxScale
        padding="3px"
        top={0}
        left={0}
        transform={"Scale(.75)"}
        transformOrigin={"top center"}
        title="EVENTS CALENDAR"
        clickFunction={() => navigate("/events")}
        content={<CalendarWidget />}
      ></DashboardBoxScale>
    </>
  );
};
