// import React, { useState, useEffect } from "react";
// import moment from "moment";
// import * as fns from "date-fns";

// function WeekScheduleTableData({ onClick, color, value, date, id }) {
//   const [empAvailibility, setEmpAvailibility] = useState({});
//   const [theDay, setTheDay] = useState("");
//   const [theId, setTheId] = useState("");

//   setTheDay(moment(date).format("dddd").toString().toLowerCase());

//   useEffect(() => {
//     setTheId(id);
//     const empAvail = async () => {
//       let fetchResult = await fetch(
//         `/api/availability/availability-day-id/day=${theDay}&id=${id}`
//       );
//       let theAvailabilityList = await fetchResult.json();
//       console.log("fetching employee availability list", theAvailabilityList);
//       setEmpAvailibility(theAvailabilityList);
//     };
//     empAvail();
//   }, [theDay, id]);

//   function isEmployeeavailable(theId, date) {
//     let dayOfWeek = fns.getDay(new Date(date));
//     console.log("this is the day", dayOfWeek);
//     // let currentEmployee = empAvailibility.find(employeeprofile.Id === id)
//     let currentEmployee = empAvailibility.find(
//       (employee) => employee.employeeProfileId === theId
//     );
//     // dayOfweek is the index for days array monday=0, sunday=6
//     const availableToday = currentEmployee?.days[0];
//     if (!availableToday?.available) {
//       console.log("employee not available");
//       return "#FC4445";
//     } else if (!availableToday?.allDay) {
//       console.log(
//         `employee is available between ${availableToday?.start} and ${availableToday?.end}`
//       );
//       return "yellow";
//     } else {
//       console.log("employee is free to suffer all day!!");
//     }
//   }
//   return (
//     <>
//       <div
//         style={{
//           position: "relative",
//           border: "lightGrey",
//           borderRight: "lightGrey",
//         }}
//         //   onClick={() => onClick}
//       >
//         {value}
//         <div
//           style={{
//             position: "absolute",
//             borderRadius: "50%",
//             height: "10px",
//             width: "10px",
//             alignSelf: "center",
//             transform: "translate(1200%, -350%)",
//             backgroundColor: color,
//           }}
//         />
//       </div>
//     </>
//   );
// }

// export default WeekScheduleTableData;
