import React, { useEffect, useState } from "react";
import StyledTable from "../StyledComponents/tables/StyledTable";
import StyledTableData from "../StyledComponents/tables/StyledTableData";
import StyledTableHeader from "../StyledComponents/tables/StyledTableHeader";
import StyledTableRow from "./StyledComponents/tables/StyledTableRow";
import "./schedule.css";

function DynamicScheduleTrialCopy() {
  const [schedule, setSchedule] = useState([]);
  const [day, setDay] = useState("2022-01-13");

  useEffect(() => {
    console.log("day is ", day);
    const fetchSchedule = async () => {
      let fetchResult = await fetch(`/api/schedule/day?day=${day}`);
      console.log("fetch result", fetchResult);
      let fetchedDay = await fetchResult.json();
      console.log("fetchedDay is", fetchedDay);

      setSchedule(fetchedDay);
    };
    fetchSchedule();
  }, [day]);
  console.log("AFTER USE EFFECT", day);

  let startTime = 8;
  let endTime = 18;
  let businessHours = [];
  let headerHours = [];
  for (let i = startTime; i < endTime; i++) {
    businessHours.push(i);
    headerHours.push(i <= 13 ? i : i - 12);
  }
  console.log(businessHours);

  // let onDayChangeValue = (day) => {
  //   setDay(day);
  //   console.log("THE NEW DAY IS", day);
  // };

  function selectTheDay(day) {
    console.log("THE DAY FROM THE FUNCTION IS", day);
    setDay(day);
  }

  return (
    <div className="container">
      <h1>Staff Schedule for {day}</h1>

      <StyledTable>
        <thead>
          <StyledTableRow>
            <StyledTableHeader>NAME</StyledTableHeader>
            {headerHours?.map((hour) => {
              if (hour === Math.floor(hour)) {
                return <StyledTableHeader>{hour}</StyledTableHeader>;
              } else return <StyledTableHeader>{hour}</StyledTableHeader>;

              /* else if (hour - 0.5 === Math.floor(hour)) {
                return <th>{hour - 0.5}:30</th>; */
            })}
          </StyledTableRow>
        </thead>
        <tbody>
          {schedule?.map((employee, index) => (
            <StyledTableRow key={index}>
              <StyledTableData key={index}>{employee.name}</StyledTableData>

              {businessHours?.map((hour, index) => {
                if (hour >= employee.start && hour < employee.end) {
                  return (
                    <StyledTableData key={index}>
                      <div
                        style={{
                          backgroundColor: "blue",
                          height: "10px",
                          padding: "0px",
                          border: "5px solid blue",
                          margin: "5px 0",
                        }}
                      ></div>
                    </StyledTableData>
                  );
                } else {
                  return <StyledTableData key={index}></StyledTableData>;
                }
              })}
            </StyledTableRow>
          ))}
        </tbody>
      </StyledTable>
      {/* <DatePicker
        setDay={setDay}
        selectTheDay={selectTheDay}

        // onDayChangeValue={onDayChangeValue}
      /> */}
      {/* <input
        type="date"
        id="single-day"
        name="day"
        value={day}
        onChange={(e) => setDay(e.target.value)}
        // value={(e) => e.target.value}
      /> */}
    </div>
  );
}
export default DynamicScheduleTrialCopy;
