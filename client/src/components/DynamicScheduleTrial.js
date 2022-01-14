import React, { useEffect, useState } from "react";

// let employeeData = [
//   {
//     name: "Julie",
//     start: 8,
//     end: 16,
//   },
//   {
//     name: "Derek",
//     start: 9,
//     end: 17,
//   },
//   {
//     name: "Reza",
//     start: 10,
//     end: 18,
//   },
//   {
//     name: "Brian",
//     start: 11,
//     end: 18,
//   },
// ];

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
  for (let i = startTime; i < endTime; i += 0.25) businessHours.push(i);
  console.log(businessHours);

  return (
    <div className="container">
      <h1>Employee One Day Schedule for {day}</h1>

      <table>
        <thead>
          <tr>
            <th>NAME</th>
            {businessHours?.map((hour) => {
              if (hour === Math.floor(hour)) {
                return <th>{hour}:00</th>;
              } else if (hour - 0.5 === Math.floor(hour)) {
                return <th>{hour - 0.5}:30</th>;
              } else return <th>|</th>;
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
                    <td key={index} style={{ backgroundColor: "blue" }}></td>
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
