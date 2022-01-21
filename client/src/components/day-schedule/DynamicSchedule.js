import React, { useEffect, useState } from "react";

import StyledTableHeader from "../reusable/tables/StyledTableHeader";

import StyledTable from "../reusable/tables/StyledTable";

function DynamicSchedule() {
  const [schedule, setSchedule] = useState([]);
  const [day, setDay] = useState("2022-01-14");

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
  for (let i = startTime; i < endTime; i += 0.25) {
    businessHours.push(i);
    headerHours.push(i < 13 ? i : i - 12);
  }
  console.log(businessHours);

  function selectTheDay(day) {
    console.log("THE DAY FROM THE FUNCTION IS", day);
    setDay(day);
  }

  return (
    <div className="container">
      <h1
        style={{
          fontWeight: "400",
          fontFamily: "Arial, Helvetica, sans-serif",
          textAlign: "center",
          textShadow: "1px 1px 2px grey",
          color: "#4488AB",
          marginTop: "20px",
          marginBottom: "0px",
        }}
      >
        Staff Schedule for {day}
        <input
          type="date"
          id="single-day"
          name="day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </h1>
      <StyledTable>
        <thead>
          <tr>
            <th>NAME</th>
            {headerHours?.map((hour) => {
              if (hour === Math.floor(hour)) {
                return (
                  <StyledTableHeader style={{ width: "50px", padding: "0px" }}>
                    {hour}
                  </StyledTableHeader>
                );
              } else if (hour - 0.5 === Math.floor(hour)) {
                return (
                  <StyledTableHeader
                    style={{
                      width: "50px",
                      padding: "0px",
                    }}
                  ></StyledTableHeader>
                );
              } else
                return (
                  <StyledTableHeader
                    style={{
                      width: "50px",
                      padding: "0px",
                    }}
                  ></StyledTableHeader>
                );
            })}
          </tr>
        </thead>
        <tbody>
          {schedule?.map((employee, index) => (
            <tr key={index}>
              <td key={index}>
                <div style={{ display: "inline-flex" }}>
                  <div
                    style={{
                      backgroundColor: "grey",
                      height: "3rem",
                      width: "2rem",
                      marginRight: "10px",
                      alignSelf: "center",
                    }}
                  ></div>
                  <div
                    style={{
                      margin: "auto 10px auto 10px",
                      color: "#4488AB",
                      fontWeight: "600",
                      display: "block",
                    }}
                  >
                    <p>{employee.name}</p>
                    <p
                      style={{
                        textShadow: "none",
                        color: "#545454",
                        fontSize: ".7rem",
                      }}
                    >
                      {employee.start}-{employee.end}
                    </p>
                  </div>
                </div>
              </td>

              {businessHours?.map((hour, index) => {
                if (hour >= employee.start && hour < employee.end) {
                  console.log(hour, employee.start);
                  return (
                    <td key={index}>
                      <div
                        style={{
                          backgroundColor: "#5AB9EA",
                          height: "45px",
                          padding: "0px",
                          border: "1px solid #5AB9EA",
                          margin: "25px 0",
                        }}
                      ></div>
                    </td>
                  );
                } else {
                  return <td key={index}></td>;
                }
              })}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
}
export default DynamicSchedule;
