import React, { useEffect, useState } from "react";
import StyledTableHeader from "../../reusable/tables/StyledTableHeader";
import moment from "moment";
import * as fns from "date-fns";
import StyledTable from "../../reusable/tables/StyledTable";
import WeekScheduleModal from "./WeekScheduleModal";
import StyledInput from "../../reusable/Inputs/StyledInput";
import PositionPicTableData from "../../reusable/PositionPicTableData";
import StyledScheduleButtonGroup from "../StyledScheduleButtonGroup";
import WeekScheduleLegend from "./WeekScheduleLegend";
import BasicDatePicker from "../../reusable/Inputs/BasicDatePicker";
import TimeOffLegend from "./TimeOffLegend";
import EditSchedule from "../../edit-schedule/EditSchedule";
import Modal from "../../reusable/Modal";
import { useManagerSettings } from "../../reusable/context/ManagerSettingsProvider";

const positionList = [
  { name: "Supervisor" },
  { name: "Waitress" },
  { name: "Cashier" },
  { name: "Dishwasher" },
  { name: "The Rezza" },
];

function WeekSchedulePosition({ setCurrentTab, currentTab, scheduleEdit }) {
  moment().format();
  const [startDay, setStartDay] = useState(
    moment().startOf("week").format("yyyy-MM-DD").toString()
  );
  const value = useManagerSettings();
  const positions = value.positions;
  const [activeEmployeeList, setActiveEmployeeList] = useState([]);
  const [modalEmployee, setModalEmployee] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [shiftId, setShiftId] = useState("");
  const [modalDate, setModalDate] = useState("");
  const [titleWeek, setTitleWeek] = useState([]);
  const [dataWeek, setDataWeek] = useState([]);
  const [theWholeWeek, setTheWholeWeek] = useState([]);
  const [timeoffs, setTimeOffs] = useState([]);
  const [empAvailibility, setEmpAvailibility] = useState([]);
  const [empTimeOff, setEmpTimeOff] = useState();
  const [date, setDate] = useState();
  const [renderPage, setRenderPage] = useState();
  const [deleteShift, setDeleteShift] = useState(false);
  const [modalData, setModalData] = useState();

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
    const fetchAlltheDaysOff = async function () {
      let fetchResult = await fetch(
        `/api/timeOff/by-start-date?startDay=${startDay}`
      );
      let theTimeOffList = await fetchResult.json();
      console.log("fetching employee timeOff list", theTimeOffList);

      setTimeOffs(theTimeOffList);
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
      fetchAlltheDaysOff();
    };
    findDateRange();
    empAvail();
    getAllTheEmployees();
  }, [startDay, renderPage]);

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
      return "#FC4445";
    } else if (!availableToday?.allDay) {
      return "gold";
    } else {
      return "#32cd32";
    }
  }
  function isEmployeeBookedOff(id, date) {
    let empBookedTimeOff = timeoffs.find(
      (timeOff) => timeOff.employeeProfileId === id
    );
    if (
      empBookedTimeOff?.startDate <= date &&
      empBookedTimeOff?.endDate >= date &&
      empBookedTimeOff.allDay === true
    ) {
      return "full";
    } else if (
      empBookedTimeOff?.startDate === date &&
      empBookedTimeOff?.endDate === date &&
      empBookedTimeOff.allDay === false
    ) {
      return "part";
    } else return null;
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

  function onInputUpdate(value, setter) {
    let newValue = fns.format(new Date(value), "yyyy-MM-dd").toString();
    console.log(newValue, "is the new formatted value for startDay");
    setter(newValue);
  }
  function onClickHandler(shift, position, date) {
    setIsOpen(true);
    setModalData({
      position: position.value,
      date: date,
    });
    setShiftId(shift._id);

    //need to send date,employeeId
    console.log("FROM ONCLICK", position, date, shift);
  }

  function tConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? "am" : "pm"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }

  return (
    <div className="container">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: " 40%  30% 30%",
          height: "auto",
          marginBottom: "1em",
        }}
      >
        <div style={{ display: "flex" }}>
          <StyledScheduleButtonGroup
            setCurrentTab={setCurrentTab}
            currentTab={currentTab}
            style={{ marginRight: "20px", alignSelf: "baseline" }}
          />
        </div>

        <div style={{ display: "inline-flex", alignContent: "baseline" }}>
          {scheduleEdit === true ? (
            <>
              <WeekScheduleLegend
                style={{ marginLeft: "15px", paddingBottom: "0px" }}
              />
              <TimeOffLegend
                style={{ marginLeft: "15px", paddingBottom: "0px" }}
              />
            </>
          ) : null}
        </div>

        {/* <div className="emptyDivForSpacing"> </div> */}
        <div
          style={{
            gridTemplateRow: "1",
            display: "flex",
            alignContent: "baseline",
            alignItems: "baseLine",
            justifyContent: "right",
            position: "relative",
          }}
        >
          <h2
            style={{
              fontSize: "1em",
              fontWeight: "400",
              fontFamily: "Arial, Helvetica, sans-serif",
              textAlign: "right",
              margin: "auto 8px 0 8px",
              color: "var(--accentColorTitle)",
            }}
          >
            Week start:
          </h2>

          <BasicDatePicker
            padding={"1rem,14px"}
            value={startDay}
            onChange={(value) => {
              onInputUpdate(value, setStartDay);
              console.log(value, "is the newStartDay");
            }}
          />
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
          {positions?.map((position, index) => (
            <tr key={index}>
              <PositionPicTableData
                position={position.label}
                scheduleEdit={scheduleEdit}
              />
              {dataWeek.map((date) => {
                let shift = theWholeWeek.find((shift) => {
                  return (
                    shift.position === position.value && shift.date === date
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
                        onClickHandler(shift, position, date);
                        console.log("FROM ONCLICK", position, date, shift);
                      }}
                    >
                      --
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
                      onClickHandler(shift, position, date);
                    }}
                  >
                    {`${tConvert(shift.start)}-${tConvert(shift.end)}`}
                    <br />
                    {`${shift.firstName} ${shift.lastName[0]}`}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          // setShift(null);
        }}
      >
        <EditSchedule
          shiftId={shiftId}
          modalData={modalData}
          // existingValues={shift}
          // clearValues={() => setShift(null)}
          onClose={() => {
            setIsOpen(false);
            setShiftId(null);
            setModalData(null);
          }}
          deleteShift={() => setDeleteShift(true)}
          reload={() => setRenderPage((prevCheck) => !prevCheck)}
          // createShift={createShift}
          // updateShift={updateShift}
        />
      </Modal>
    </div>
  );
}

export default WeekSchedulePosition;
