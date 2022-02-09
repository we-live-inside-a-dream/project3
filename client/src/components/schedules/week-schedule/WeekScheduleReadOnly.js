import React, { useEffect, useState } from "react";
import EditSchedule from "../edit-schedule/EditSchedule";
import StyledTableHeader from "../reusable/tables/StyledTableHeader";
import moment from "moment";
import StyledTable from "../reusable/tables/StyledTable";
import Modal from "../reusable/Modal";
import StyledButton from "../reusable/Inputs/StyledButton";
import StyledEditButton from "../reusable/Inputs/StyledEditButton";
import WeekScheduleModal from "./WeekScheduleModal";
import StyledInput from "../reusable/Inputs/StyledInput";

function WeekSchedule() {
  moment().format();
  const [startDay, setStartDay] = useState(
    moment().startOf("week").format("yyyy-MM-DD").toString()
  );
  const [activeEmployeeList, setActiveEmployeeList] = useState([]);
  const [modalEmployee, setModalEmployee] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalShift, setModalShift] = useState("");
  const [modalDate, setModalDate] = useState("");
  const [titleWeek, setTitleWeek] = useState([]);
  const [dataWeek, setDataWeek] = useState([]);
  const [theWholeWeek, setTheWholeWeek] = useState([]);

  //this use effect is just to have access to the current active employees for name and Id for the display, and the edit form
  useEffect(() => {
    const getAllTheEmployees = async function () {
      let employeeLst = await fetch(process.env.REACT_APP_ELECTRON_SERVER+"/api/employeeProfile/employees/names");
      let nameIdList = await employeeLst.json();
      setActiveEmployeeList(nameIdList);
    };
    //this function finds an array of dates depending on the start and end date chosen by the inputs.  these dates are then formatted

    const fetchAllTheDays = async function () {
      async function fetchWeek() {
        let theQueryWeek = await fetch(process.env.REACT_APP_ELECTRON_SERVER+`/api/schedule/week?day0=${startDay}`);
        let fetchResult = await theQueryWeek.json();
        setTheWholeWeek(fetchResult);
      }
      fetchWeek();
    };

    //it then sets the titleWeek string: "Day, number", then sets dataWeek to "yyyy,MM,dd" to match database
    const findDateRange = function () {
      let datesArray = [];
      let dateNumberArray = [];
      let firstDate = moment(startDay).startOf("day");
      firstDate.subtract(1, "days");
      let lastDate = moment(startDay).add(6, "days").startOf("day");
      while (firstDate.add(1, "days").diff(lastDate) <= 0) {
        datesArray.push(firstDate.clone().format("dddd, Do").toString());
        dateNumberArray.push(firstDate.clone().format("yyyy-MM-DD").toString());
      }
      setTitleWeek(datesArray);
      setDataWeek(dateNumberArray);
      fetchAllTheDays();
    };
    getAllTheEmployees();
    findDateRange();
  }, [startDay]);

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
        <StyledInput
          type="date"
          id="single-day"
          name="day"
          value={startDay}
          onChange={(e) => {
            setStartDay(e.target.value);
          }}
        />
      </h1>
      <StyledTable>
        <thead>
          <tr>
            <th>NAME</th>
            {titleWeek?.map((day, index) => {
              return <StyledTableHeader index={index}>{day}</StyledTableHeader>;
            })}
          </tr>
        </thead>
        <tbody>
          {activeEmployeeList?.map((employee) => (
            // <ShiftComponent businessHours = {businessHours} setShiftId = {setShiftId} employee = {employee} index ={index} />
            <tr key={employee._id}>
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
                      {/* <StyledEditButton
                        fontSize={"1em"}
                        padding={"1px"}
                        margin={"1px"}
                        // onClick={() => setIsOpen(true)}
                      >
                        ✎
                      </StyledEditButton> */}
                    </div>
                  </div>
                </div>
              </td>

              {dataWeek.map((date) => {
                let shift = theWholeWeek.find((shift) => {
                  return (
                    shift.employeeId === employee._id && shift.date === date
                  );
                });
                if (!shift)
                  return (
                    <td
                      onClick={() => {
                        setModalOpen(true);
                        setModalShift(shift);
                        setModalEmployee(employee);
                        setModalDate(date);
                        console.log("FROM ONCLICK", employee, date, shift);
                      }}
                    >
                      --
                    </td>
                  );
                return (
                  <td
                    key={shift._id}
                    onClick={() => {
                      setModalOpen(true);
                      setModalShift(shift);
                      setModalEmployee(employee);
                      setModalDate(date);
                      console.log("FROM ONCLICK", employee, date, shift);
                    }}
                  >{`${shift.start}-${shift.end}`}</td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </StyledTable>
      {modalOpen && (
        <WeekScheduleModal
          shift={modalShift}
          employee={modalEmployee}
          setModalOpen={setModalOpen}
          date={modalDate}
        />
      )}
    </div>
  );
}

export default WeekSchedule;
