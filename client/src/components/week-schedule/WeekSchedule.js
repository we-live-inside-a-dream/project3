import React, { useEffect, useState } from "react";
import EditSchedule from "../edit-schedule/EditSchedule";
import StyledTableHeader from "../reusable/tables/StyledTableHeader";
import moment from "moment";
import StyledTable from "../reusable/tables/StyledTable";
import Modal from "../reusable/Modal";
import StyledButton from "../reusable/Inputs/StyledButton";
import StyledEditButton from "../reusable/Inputs/StyledEditButton";

function WeekSchedule() {
  moment().format();
  const [activeEmployeeList, setActiveEmployeeList] = useState([]);
  const [startDay, setStartDay] = useState(
    moment().startOf("week").format("yyyy-MM-DD").toString()
  );
  const [endDay, setEndDay] = useState(
    moment().endOf("week").format("yyyy-MM-DD").toString()
  );
  const [day0, setDay0] = useState("");
  const [day1, setDay1] = useState("");
  const [day2, setDay2] = useState("");
  const [day3, setDay3] = useState("");
  const [day4, setDay4] = useState("");
  const [day5, setDay5] = useState("");
  const [day6, setDay6] = useState("");
  const [titleWeek, setTitleWeek] = useState([]);
  const [dataWeek, setDataWeek] = useState([]);

  const [theWholeWeek, setTheWholeWeek] = useState([]);
  // const [isOpen, setIsOpen] = useState();
  // const [shiftId, setShiftId] = useState();

  useEffect(() => {
    findDateRange(startDay, endDay);
    const getAllTheEmployees = async function () {
      let employeeLst = await fetch("/api/employeeProfile/employees/names");
      let nameIdList = await employeeLst.json();
      setActiveEmployeeList(nameIdList);
    };
    getAllTheEmployees();
  }, [startDay, endDay]);
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
      dateNumberArray.push(firstDate.clone().format("yyyy-MM-DD").toString());
    }
    setTitleWeek(datesArray);
    setDataWeek(dateNumberArray);
    fetchAllTheDays(dataWeek);
    setDay0(dataWeek[0]);
    setDay1(dataWeek[1]);
    setDay2(dataWeek[2]);
    setDay3(dataWeek[3]);
    setDay4(dataWeek[4]);
    setDay5(dataWeek[5]);
    setDay5(dataWeek[6]);
  };

  const fetchAllTheDays = async function (dataWeek) {
    async function fetchWeek(dataWeek) {
      let theQueryWeek = await fetch(
        `/api/schedule/week?day0=${dataWeek[0]}&day1=${dataWeek[1]}&day2=${dataWeek[2]}&day3=${dataWeek[3]}&day4=${dataWeek[4]}&day5=${dataWeek[5]}&day6=${dataWeek[6]}`
      );
      let fetchResult = await theQueryWeek.json();
      setTheWholeWeek(fetchResult);
    }
    fetchWeek(dataWeek);
  };

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
        <tbody>
          {activeEmployeeList?.map((employee, index) => (
            // <ShiftComponent businessHours = {businessHours} setShiftId = {setShiftId} employee = {employee} index ={index} />
            <tr key={index}>
              {/* <tr key={index} onClick={() => setShiftId(employee._id)}> */}
              <td>
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
                      // onClick={() => setDeleteShift(true)}
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
                    <p>
                      {employee.firstName}
                      {employee.lastName}
                    </p>

                    <p
                      style={{
                        textShadow: "none",
                        color: "#545454",
                        fontSize: ".7rem",
                      }}
                    ></p>
                    <div>
                      <StyledEditButton
                        fontSize={"1em"}
                        padding={"1px"}
                        margin={"1px"}
                        // onClick={() => setIsOpen(true)}
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
              {theWholeWeek?.filter((shif) => shif.employeeId === employee.Id)}
              {theWholeWeek?.map((date, index) => {
                return dataWeek.map((day) => {
                  return <td>something</td>;
                });
              })}
              <td></td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
}
export default WeekSchedule;
// async function fetchZero() {
//   let dayZero = await fetch(`/api/schedule/day?day=${dataWeek[0]}`);
//   let fetchResultZero = await dayZero.json();
//   setDay0(fetchResultZero);
//   console.log(fetchResultZero);
//   // fetchOne();
// }
// async function fetchOne() {
//   let dayOne = await fetch(`/api/schedule/day?day=${dataWeek[1]}`);
//   let fetchResultOne = await dayOne.json();
//   setDay1(fetchResultOne);
//   // console.log(fetchResultOne);
// }
// async function fetchTwo() {
//   let dayTwo = await fetch(`/api/schedule/day?day=${dataWeek[2]}`);
//   let fetchResultTwo = await dayTwo.json();
//   setDay2(fetchResultTwo);
//   // console.log(fetchResultOne);
// }
// async function fetchThree() {
//   let dayThree = await fetch(`/api/schedule/day?day=${dataWeek[3]}`);
//   let fetchResultThree = await dayThree.json();
//   setDay3(fetchResultThree);
//   // console.log(fetchResultThree);
// }
// async function fetchFour() {
//   let dayFour = await fetch(`/api/schedule/day?day=${dataWeek[4]}`);
//   let fetchResultFour = await dayFour.json();
//   setDay4(fetchResultFour);
//   // console.log(fetchResultFour);
// }
// async function fetchFive() {
//   let dayFive = await fetch(`/api/schedule/day?day=${dataWeek[5]}`);
//   let fetchResultFive = await dayFive.json();
//   setDay5(fetchResultFive);
//   // console.log(fetchResultFive);
// }
// async function fetchSix() {
//   let daySix = await fetch(`/api/schedule/day?day=${dataWeek[6]}`);
//   let fetchResultSix = await daySix.json();
//   setDay6(fetchResultSix);
//   // console.log(fetchResultSix);
// }
// fetchZero();
// fetchOne();
// fetchTwo();
// fetchThree();
// fetchFour();
// fetchFive();
// fetchSix();
