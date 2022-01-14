import React, { useEffect, useState } from "react";
import "./schedule.css";
import DayPicker from "./DatePicker";

function DynamicScheduleTrial() {
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
  console.log(day);

  let startTime = 8;
  let endTime = 18;
  let businessHours = [];
  let headerHours = [];
  for (let i = startTime; i < endTime; i++) {
    businessHours.push(i);
    headerHours.push(i <= 13 ? i : i - 12);
  }
  console.log(businessHours);

  return (
    <div className="container">
      <h1>Staff Schedule for {day}</h1>

      <table>
        <thead>
          <tr>
            <th>NAME</th>
            {headerHours?.map((hour) => {
              if (hour === Math.floor(hour)) {
                return <th>{hour}</th>;
              } else return <th>|</th>;

              /* else if (hour - 0.5 === Math.floor(hour)) {
                return <th>{hour - 0.5}:30</th>; */
            })}
          </tr>
        </thead>
        <tbody>
          {schedule?.map((employee, index) => (
            <tr key={index}>
              <td key={index}>{employee.name}</td>

              {businessHours?.map((hour, index) => {
                if (hour >= employee.start && hour < employee.end) {
                  return (
                    <td key={index}>
                      <div
                        style={{
                          backgroundColor: "blue",
                          height: "10px",
                          padding: "0px",
                          border: "5px solid blue",
                          margin: "5px 0",
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
      </table>
      <input
        type="date"
        id="single-day"
        name="day"
        value={day}
        onChange={(e) => setDay(e.target.value)}
        // value={(e) => e.target.value}
      />
      {/* <input
        type="date"
        id="date"
        name="day-view"
        value={(e) => e.target.value}
      /> */}
    </div>
  );
}
export default DynamicScheduleTrial;
