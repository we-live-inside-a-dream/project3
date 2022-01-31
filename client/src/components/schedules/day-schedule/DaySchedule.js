import React, { useEffect, useState } from "react";
import EditSchedule from "../../edit-schedule/EditSchedule";
import StyledTableHeader from "../../reusable/tables/StyledTableHeader";
import StyledTable from "../../reusable/tables/StyledTable";
import Modal from "../../reusable/Modal";
import NamePicTableData from "../../reusable/NamePicTableData";
import StyledButtonGroup from "../StyledScheduleButtonGroup";
import StyledInput from "../../reusable/Inputs/StyledInput";
import { bottomNavigationActionClasses } from "@mui/material";

function DaySchedule({ setCurrentTab, currentTab }) {
  const [shift, setShift] = useState();
  const [schedule, setSchedule] = useState([]);
  const [day, setDay] = useState("2022-01-14");
  const [isOpen, setIsOpen] = useState();
  const [shiftId, setShiftId] = useState("");
  const [deleteShift, setDeleteShift] = useState(false);

  useEffect(() => {
    if (shiftId) {
      console.log("shiftId is", shiftId);
      const fetchShift = async () => {
        let fetchResult = await fetch(`/api/schedule/id?id=${shiftId}`);
        let fetchedShift = await fetchResult.json();
        setShift(fetchedShift);
        // console.log("AFTER USE EFFECT SHIFT ID", shiftId);
      };
      const deleteShiftById = async () => {
        await fetch(`/api/schedule/schedule/delete?id=${shiftId}`, {
          method: "DELETE",
        });
      };
      //if (deleteShift === true) delete shiftID else fetch shift when shiftId is called
      if (deleteShift) {
        console.log("trying to delete shift!!");
        deleteShiftById();
        setDeleteShift(false);
      } else {
        fetchShift();
      }
      console.log("AFTER USE EFFECT SHIFT ID", shiftId);
    }
  }, [shiftId, deleteShift]);

  useEffect(() => {
    const fetchSchedule = async () => {
      let fetchResult = await fetch(`/api/schedule/day?day=${day}`);
      let fetchedDay = await fetchResult.json();
      // console.log("FETCHED DAY", fetchedDay);
      setSchedule(fetchedDay);
    };
    fetchSchedule();
  }, [day]);

  //business hours should come from a db fetch
  let startTime = 8;
  let endTime = 18;
  let businessHours = [];
  let headerHours = [];
  for (let i = startTime; i < endTime; i += 0.25) {
    businessHours.push(i);
    headerHours.push(i < 13 ? i : i - 12);
  }

  // const deleteEmployeeShift
  function convertTime(prop) {
    let timeString =
      prop.slice(0, 2) + (prop.slice(3) / 60).toString().slice(1);
    // converts 8:30 into 8.5 etc...
    return timeString;
  }
  return (
    <div className="container">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "30% 70%",
          height: "auto",
        }}
      >
        <StyledButtonGroup
          setCurrentTab={setCurrentTab}
          currentTab={currentTab}
        />

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
          For day:
          <StyledInput
            style={{ marginBottom: "0px" }}
            type="date"
            id="single-day"
            name="day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
        </h2>
      </div>
      <StyledTable>
        <thead>
          <tr>
            <th>NAME</th>
            {headerHours?.map((hour) => {
              if (hour === Math.floor(hour)) {
                return (
                  <StyledTableHeader
                    style={{ minWidth: "25px", padding: "0px" }}
                  >
                    {hour}
                  </StyledTableHeader>
                );
              } else if (hour - 0.5 === Math.floor(hour)) {
                return (
                  <StyledTableHeader
                    style={{
                      minWidth: "25px",
                      padding: "0px",
                    }}
                  ></StyledTableHeader>
                );
              } else
                return (
                  <StyledTableHeader
                    style={{
                      minWidth: "25px",
                      padding: "0px",
                    }}
                  ></StyledTableHeader>
                );
            })}
          </tr>
        </thead>

        <tbody>
          {schedule?.map((employee) => (
            // <ShiftComponent businessHours = {businessHours} setShiftId = {setShiftId} employee = {employee} index ={index} />
            <tr key={employee._id} onClick={() => setShiftId(employee._id)}>
              <NamePicTableData
                firstName={employee.firstName}
                lastName={employee.lastName}
                edit="edit"
                onClick={() => setIsOpen(true)}
              />

              {/* <Modal open={deleteShift} onClose={() => setDeleteShift(false)}>
                DO you want to delete this shift?
                <StyledButton onClick={deleteShiftById()}>YES</StyledButton>
                <StyledButton onClick ={setDeleteShift(false)}>NO</StyledButton>
              </Modal> */}

              {businessHours?.map((hour, index) => {
                if (
                  hour >= convertTime(employee.start) &&
                  hour < convertTime(employee.end)
                ) {
                  return (
                    <td key={index}>
                      <div
                        style={{
                          // backgroundColor: "#EEAA78",
                          backgroundColor: "#66b9bf",

                          height: "30px",
                          padding: "0px",
                          border: "1px solid #66b9bf",
                          // border: "1px solid #EEAA78",

                          margin: "2px 0",
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
        </tbody>
      </StyledTable>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <EditSchedule
          shiftId={shiftId}
          existingValues={shift}
          onClose={() => setIsOpen(false)}
        />
        **edit**
      </Modal>
    </div>
  );
}
export default DaySchedule;
