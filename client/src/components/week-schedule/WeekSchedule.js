import React, { useEffect, useState } from "react";
import EditSchedule from "../edit-schedule/EditSchedule";
import StyledTableHeader from "../reusable/tables/StyledTableHeader";
import moment from "moment";
import StyledTable from "../reusable/tables/StyledTable";
import Modal from "../reusable/Modal";

function WeekSchedule() {
  moment().format();
  const [shift, setShift] = useState();
  const [schedule, setSchedule] = useState([]);
  const [week, setWeek] = useState([]);
  const [startDay, setStartDay] = useState();
  const [endDay, setEndDay] = useState();
  const [isOpen, setIsOpen] = useState();
  const [shiftId, setShiftId] = useState();

  // useEffect(() => {
  //   setStartDay();
  //   setEndDay("2022-02-01");
  // }, []);

  const findDateRange = function (startDay, endDay) {
    let datesArray = [];

    let firstDate = moment(startDay).startOf("day");
    firstDate.subtract(1, "days");
    let lastDate = moment(endDay).startOf("day");

    while (firstDate.add(1, "days").diff(lastDate) <= 0) {
      // console.log(firstDate.toDate());
      datesArray.push(firstDate.clone().format("dddd, Do").toString());
      // formatDate(datesArray);
    }
    // console.log(dates);
    setWeek(datesArray);
    console.log(week);
  };
  // let startTime = 8;
  // let endTime = 18;
  // let businessHours = [];
  // let headerHours = [];
  // for (let i = startTime; i < endTime; i += 0.25) {
  //   businessHours.push(i);
  //   headerHours.push(i < 13 ? i : i - 12);
  // }
  // console.log(businessHours);

  // function selectTheDay(day) {
  //   console.log("THE DAY FROM THE FUNCTION IS", day);
  //   setDay(day);
  // }

  // function convertTime(prop) {
  //   let timeString =
  //     prop.slice(0, 2) + (prop.slice(3) / 60).toString().slice(1);
  //   // console.log(timeString,"new String")
  //   return timeString;
  // }

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
        Staff Schedule for the week
        <input
          type="date"
          id="single-day"
          name="day"
          value={startDay}
          onChange={(e) => setStartDay(e.target.value)}
        />
        <input
          type="date"
          id="single-day"
          name="day"
          value={endDay}
          onChange={(e) => {
            setEndDay(e.target.value);
          }}
        />
      </h1>
      <p>{startDay}</p>
      <p>{endDay}</p>
      <button onClick={(e) => findDateRange(startDay, endDay)}>
        SHOW WEEK
      </button>

      <StyledTable>
        <thead>
          <tr>
            <th>NAME</th>
            {week?.map((day, index) => {
              return <StyledTableHeader index={index}>{day}</StyledTableHeader>;
            })}
          </tr>
        </thead>
        <tbody></tbody>
      </StyledTable>
    </div>
  );
}
export default WeekSchedule;
