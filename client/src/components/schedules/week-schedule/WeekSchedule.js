import React, { useEffect, useState } from "react";
// import EditSchedule from "../edit-schedule/EditSchedule";
import StyledTableHeader from "../../reusable/tables/StyledTableHeader";
import moment from "moment";
import * as fns from "date-fns";
import StyledTable from "../../reusable/tables/StyledTable";
// import Modal from "../../reusable/Modal";
// import StyledButton from "../../reusable/Inputs/StyledButton";
// import StyledEditButton from "../../reusable/Inputs/StyledEditButton";
import WeekScheduleModal from "./WeekScheduleModal";
import StyledInput from "../../reusable/Inputs/StyledInput";
import NamePicTableData from "../../reusable/NamePicTableData";
import StyledScheduleButtonGroup from "../StyledScheduleButtonGroup";
import WeekScheduleLegend from "./WeekScheduleLegend";

function WeekSchedule({ setCurrentTab, currentTab }) {
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
  // const [employeeId, setEmployeeId] = useState()
  const [empAvailibility, setEmpAvailibility] = useState([]);
  const [date, setDate] = useState();
  // const [availabilityColor, setAvailabilityColor] = useState();
  let availabilityColor = "";
  //this use effect is just to have access to the current active employees for name and Id for the display, and the edit form
  useEffect(() => {
    const getAllTheEmployees = async function () {
      let employeeLst = await fetch("/api/employeeProfile/employees/names");
      let nameIdList = await employeeLst.json();
      setActiveEmployeeList(nameIdList);
    };
    //this function finds an array of dates depending on the start and end date chosen by the inputs.  these dates are then formatted

    const fetchAllTheDays = async function () {
      async function fetchWeek() {
        let theQueryWeek = await fetch(`/api/schedule/week?day0=${startDay}`);
        let fetchResult = await theQueryWeek.json();
        setTheWholeWeek(fetchResult);
      }
      fetchWeek();
    };

    const empAvail = async () => {
      let fetchResult = await fetch(`/api/availability/availability-all`);
      let theAvailabilityList = await fetchResult.json();
      console.log("fetching employee availability list", theAvailabilityList);

      setEmpAvailibility(theAvailabilityList);

      // empAvailibility.forEach((element) => console.log(element.days[0]));
    };

    // const empAvail = async ()=>{
    //         let fetchAvailibility = await fetch(`/api/availability/availability-all}`)
    //         let employeeAvailibility = await fetchAvailibility.json()
    //         console.log("employeeAvailibility...",employeeAvailibility)
    //         setEmpAvailibility(employeeAvailibility)
    // }

    //it then sets the titleWeek string: "Day, number", then sets dataWeek to "yyyy,MM,dd" to match database
    const findDateRange = function () {
      let datesArray = [];
      let dateNumberArray = [];
      let firstDate = moment(startDay).startOf("day");
      firstDate.subtract(1, "days");
      let lastDate = moment(startDay).add(6, "days").startOf("day");
      while (firstDate.add(1, "days").diff(lastDate) <= 0) {
        datesArray.push(firstDate.clone().format("ddd, Do").toString());
        dateNumberArray.push(firstDate.clone().format("yyyy-MM-DD").toString());
      }
      setTitleWeek(datesArray);
      setDataWeek(dateNumberArray);
      fetchAllTheDays();
    };
    empAvail();
    getAllTheEmployees();
    findDateRange();
  }, [startDay]);

  // empAvailibility.forEach(element => console.log(element.days[dayOfWeek]));
  function isEmployeeavailable(id, date) {
    let dayOfWeek = fns.getDay(new Date(date));
    // console.log("this is the day", dayOfWeek);
    // let currentEmployee = empAvailibility.find(employeeprofile.Id === id)
    let currentEmployee = empAvailibility.find(
      (employee) => employee.employeeProfileId === id
    );
    // dayOfweek is the index for days array monday=0, sunday=6
    const availableToday = currentEmployee?.days[dayOfWeek];
    if (!availableToday?.available) {
      // console.log("employee not available");
      return "#FC4445";
    } else if (!availableToday?.allDay) {
      // console.log(
      //   `employee is available between ${availableToday?.start} and ${availableToday?.end}`
      // );
      return "gold";
    } else {
      // console.log("employee is free to suffer all day!!");
      return "#32cd32";
    }
  }

  // useEffect(()=>{
  //     // need to ensure employee isnt working over 40 hours this week
  //     // need to see if employee has vacation or time off booked
  //     // need to compare day of the week to weekly availibility
  //     //       first figure out what day of the week it is...
  //     console.log('employee weekly availibility',availableToday)
  //   }
  //   let dayOfWeek = fns.getDay(new Date(date));
  // if(empAvailibility){ console.log(empAvailibility)
  //   console.log("date is...",date)
  //   console.log("week day is...",dayOfWeek,"of 6" )//monday = 0 sunday = 6
  //   isEmployeeavailable()
  // };
  // },[date])

  return (
    <div className="container">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: " 50% 50%",
          height: "auto",
        }}
      >
        <div style={{ display: "inline-flex", alignContent: "baseline" }}>
          <StyledScheduleButtonGroup
            setCurrentTab={setCurrentTab}
            currentTab={currentTab}
            style={{ marginRight: "20px", alignSelf: "baseline" }}
          />
          <WeekScheduleLegend
            style={{ marginLeft: "15px", paddingBottom: "0px" }}
          />
        </div>
        <div style={{ gridTemplateRow: "1" }}>
          <h2
            style={{
              fontWeight: "400",
              fontFamily: "Arial, Helvetica, sans-serif",
              textAlign: "right",
              color: "#07889b",
              marginTop: "0px",
              marginBottom: "0px",
              paddingBottom: "0px",
            }}
          >
            Week Starting:
            <StyledInput
              style={{ marginBottom: "0px" }}
              type="date"
              id="single-day"
              name="day"
              value={startDay}
              onChange={(e) => {
                setStartDay(e.target.value);
              }}
            />
          </h2>
        </div>
      </div>
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
              {/* <tr key={index} onClick={() => setShiftId(employee._id)}>  */}
              <NamePicTableData
                firstName={employee.firstName}
                lastName={employee.lastName}
              />

              {dataWeek.map((date) => {
                let shift = theWholeWeek.find((shift) => {
                  return (
                    shift.employeeId === employee._id && shift.date === date
                  );
                });

                if (!shift)
                  return (
                    <td
                      style={{
                        position: "relative",
                        border: "lightGrey",
                        borderRight: "lightGrey",
                      }}
                      onClick={() => {
                        setModalOpen(true);
                        setModalShift(shift);
                        setModalEmployee(employee);
                        setModalDate(date);
                        console.log("FROM ONCLICK", employee, date, shift);
                      }}
                    >
                      --
                      <div
                        style={{
                          position: "absolute",
                          borderRadius: "50%",
                          height: "10px",
                          width: "10px",
                          alignSelf: "center",
                          transform: "translate(1200%, -350%)",
                          backgroundColor: isEmployeeavailable(
                            employee._id,
                            date
                          ),
                        }}
                      />
                    </td>
                  );
                return (
                  <td
                    style={{
                      position: "relative",
                      borderTop: "lightGrey",
                      borderLeft: "lightGrey",
                      borderRight: "lightGrey",
                    }}
                    key={shift._id}
                    onClick={() => {
                      setModalOpen(true);
                      setModalShift(shift);
                      setModalEmployee(employee);
                      setModalDate(date);
                      console.log("FROM ONCLICK", employee, date, shift);
                    }}
                    backgroundColor={availabilityColor}
                  >
                    {`${shift.start}-${shift.end} `}
                  </td>
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
