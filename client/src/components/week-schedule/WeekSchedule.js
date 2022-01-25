import React, { useEffect, useState } from "react";
import EditSchedule from "../edit-schedule/EditSchedule";
import StyledTableHeader from "../reusable/tables/StyledTableHeader";
import moment from "moment";
import StyledTable from "../reusable/tables/StyledTable";
import Modal from "../reusable/Modal";

function WeekSchedule() {
  moment().format();
  // const [shift, setShift] = useState();
  // const [schedule, setSchedule] = useState([]);
  const [titleWeek, setTitleWeek] = useState([]);
  const [dataWeek, setDataWeek] = useState([]);
  const [startDay, setStartDay] = useState();
  const [endDay, setEndDay] = useState();
  // const [isOpen, setIsOpen] = useState();
  // const [shiftId, setShiftId] = useState();

  // useEffect(() => {
  //   const fetchSchedule = async () => {
  //     let fetchResult = await fetch(`/api/employeeProfile/employees}`);
  //     let fetchedDay = await fetchResult.json();
  //     setSchedule(fetchedDay);
  //   };
  //   fetchSchedule();
  // }, [day]);
  //this function finds an array of dates depending on the start and end date chosen by the inputs.  these dates are then formatted
  //it then sets the titleWeek string: "Day, number", then sets dataWeek to "yyyy,MM,dd" to match database
  const findDateRange = function (startDay, endDay) {
    let datesArray = [];
    let dateNumberArray = [];
    let firstDate = moment(startDay).startOf("day");
    firstDate.subtract(1, "days");
    let lastDate = moment(endDay).startOf("day");
    while (firstDate.add(1, "days").diff(lastDate) <= 0) {
      datesArray.push(firstDate.clone().format("dddd, Do").toString());
      dateNumberArray.push(firstDate.clone().format("yyyy, MM, DD").toString());
    }
    setTitleWeek(datesArray);
    setDataWeek(dateNumberArray);
    console.log(titleWeek);
    console.log(dataWeek);
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
        <button onClick={(e) => findDateRange(startDay, endDay)}>
          SHOW WEEK
        </button>
      </h1>

      <StyledTable>
        <thead>
          <tr>
            <th>NAME</th>
            {dataWeek?.map((day, index) => {
              return <StyledTableHeader index={index}>{day}</StyledTableHeader>;
            })}
          </tr>
        </thead>
        {/* <tbody>
          {schedule?.map((employee, index) => (
            // <ShiftComponent businessHours = {businessHours} setShiftId = {setShiftId} employee = {employee} index ={index} />
            <tr key={index} onClick={() => setShiftId(employee._id)}>
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
                  >
                    {" "}
                    <StyledButton
                      fontSize={"0.5em"}
                      padding={"0px"}
                      margin={"0em"}
                      textAlign={"left"}
                      onClick={() => setDeleteShift(true)}
                    >
                      X
                    </StyledButton>
                  </div>

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
                      {employee.start.slice(0, 2)}-{employee.end.slice(0, 2)}
                    </p>
                    <div>
                      <StyledEditButton
                        fontSize={"1em"}
                        padding={"1px"}
                        margin={"1px"}
                        onClick={() => setIsOpen(true)}
                      >
                        ✎
                      </StyledEditButton>
                    </div>
                  </div>
                </div>
              </td>
              {/* <Modal open={deleteShift} onClose={() => setDeleteShift(false)}>
                DO you want to delete this shift?
                <StyledButton onClick={deleteShiftById()}>YES</StyledButton>
                <StyledButton onClick ={setDeleteShift(false)}>NO</StyledButton>
              </Modal> */}

        {/* {businessHours?.map((hour, index) => {
                if (
                  hour >= convertTime(employee.start) &&
                  hour < convertTime(employee.end)
                ) {
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

              <td></td>
            </tr>
          ))}
        </tbody>  */}
      </StyledTable>
    </div>
  );
}
export default WeekSchedule;
