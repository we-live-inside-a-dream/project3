import React, { useEffect, useState } from "react";
import EditSchedule from "../../edit-schedule/EditSchedule";
import StyledTableHeader from "../../reusable/tables/StyledTableHeader";
import StyledTable from "../../reusable/tables/StyledTable";
import Modal from "../../reusable/Modal";
import NamePicTableData from "../../reusable/NamePicTableData";
import StyledScheduleButtonGroup from "../StyledScheduleButtonGroup";
import BasicDatePicker from "../../reusable/Inputs/BasicDatePicker";
import moment from "moment";
import { StyledButton } from "../../reusable/Inputs/StyledEmployeeForm";

function DaySchedule({ setCurrentTab, currentTab, scheduleEdit }) {
  // const [shift, setShift] = useState();
  const [schedule, setSchedule] = useState([]);
  const [day, setDay] = useState();
  const [isOpen, setIsOpen] = useState();
  const [shiftId, setShiftId] = useState();
  // const [deleteShift, setDeleteShift] = useState(false);
  const [renderPage, setRenderPage] = useState();
  const [modalData, setModalData] = useState();

  useEffect(() => {
    let today = new Date();
    setDay(moment(today).format("yyyy-MM-DD"));
  }, []);

  // useEffect(() => {
  //   console.log("day", modalData);
  // }, [modalData]);

  // useEffect(() => {
  //   console.log("shiftId", shiftId);
  // }, [shiftId]);
  // useEffect(() => {
  //   if (shiftId) {
  //     const fetchShift = async () => {
  //       let fetchResult = await fetch(`/api/schedule/id?id=${shiftId}`);
  //       let fetchedShift = await fetchResult.json();
  //       setShift(fetchedShift);
  //     };
  //     const deleteShiftById = async () => {
  //       await fetch(`/api/schedule/schedule/delete?id=${shiftId}`, {
  //         method: "DELETE",
  //       });
  //     };
  //     //if (deleteShift === true) delete shiftID else fetch shift when shiftId is called
  //     if (deleteShift) {
  //       deleteShiftById();
  //       setDeleteShift(false);
  //       setIsOpen(false);
  //     } else {
  //       fetchShift();
  //     }
  //   }
  // }, [shiftId, deleteShift]);

  useEffect(() => {
    const fetchSchedule = async () => {
      let fetchResult = await fetch(`/api/schedule/day?day=${day}`);
      let fetchedDay = await fetchResult.json();
      console.log("fetchedDay", fetchedDay);
      setSchedule(fetchedDay);
    };
    fetchSchedule();
  }, [day, renderPage]);
  // }, [day, createShift, updateShift, deleteShift]);

  //business hours should come from a db fetch
  let startTime = 8;
  let endTime = 18;
  let businessHours = [];
  let headerHours = [];
  for (let i = startTime; i < endTime; i += 0.25) {
    businessHours.push(i);
    headerHours.push(i < 13 ? i : i - 12);
  }
  function onInputUpdate(value, setter) {
    let newValue = moment(value).format("yyyy-MM-DD");
    // console.log(newValue, "is the new formatted value for startDay");
    setter(newValue);
  }
  // const deleteEmployeeShift
  function convertTime(prop) {
    let timeString =
      prop.slice(0, 2) + (prop.slice(3) / 60).toString().slice(1);

    // converts 8:30 into 8.5 etc...
    return timeString;
  }
  function handleClick() {
    setModalData({ date: day });
    setIsOpen(true);
  }
  console.log("FROM DAY SCHEULE", scheduleEdit);
  // async function createShift(createdUser) {
  //   await fetch("/api/schedule/schedule/new", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(createdUser),
  //   });
  // }

  // async function updateShift(updatedUser) {
  //   console.log("new user data", updatedUser);
  //   await fetch(`/api/schedule/schedule/update?id=${shiftId}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(updatedUser),
  //   });
  // }

  return (
    <div className="container">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: " 50%  20% 30%",
          height: "auto",
          marginBottom: "1em",
        }}
      >
        <div style={{ display: "inline-flex", alignContent: "baseline" }}>
          <StyledScheduleButtonGroup
            setCurrentTab={setCurrentTab}
            currentTab={currentTab}
            style={{ marginRight: "20px", alignSelf: "baseline" }}
          />
        </div>
        <div className="emptyDivForSpacing"> </div>

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
          <BasicDatePicker
            padding="1rem 14px"
            style={{ display: "inline" }}
            value={day}
            onChange={(value) => {
              onInputUpdate(value, setDay);
              // console.log(value, "is the newStartDay");
            }}
          />
        </div>
      </div>
      <StyledTable margin={"0 0 0 0 "}>
        <thead>
          <tr>
            <th>NAME</th>
            {headerHours?.map((hour) => {
              if (hour === Math.floor(hour)) {
                return (
                  <StyledTableHeader
                    key={hour}
                    style={{ minWidth: "25px", padding: "0px" }}
                  >
                    {hour}
                  </StyledTableHeader>
                );
              } else if (hour - 0.5 === Math.floor(hour)) {
                return (
                  <StyledTableHeader
                    key={hour}
                    style={{
                      minWidth: "25px",
                      padding: "0px",
                    }}
                  ></StyledTableHeader>
                );
              } else
                return (
                  <StyledTableHeader
                    key={hour}
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
              <td>
                <NamePicTableData
                  firstName={employee.firstName}
                  lastName={employee.lastName}
                  position={
                    employee?.position.charAt(0).toUpperCase() +
                    employee?.position.slice(1)
                  }
                  imageUrl={`${employee?.firstName.toLowerCase()}.jpg`}
                  canEdit={scheduleEdit}
                  edit="edit"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                />
              </td>

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
                          backgroundColor: "var(--scheduleTimeBar)",
                          height: "30px",
                          padding: "0px",
                          border: "1px solid var(--scheduleTimeBar)",
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
      {scheduleEdit === true ? (
        <StyledButton
          style={{ marginTop: "1em" }}
          onClick={() => handleClick()}
        >
          ADD SHIFT
        </StyledButton>
      ) : null}
      <Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          // setShift(null);
        }}
      >
        <EditSchedule
          modalData={modalData}
          shiftId={shiftId}
          onClose={() => {
            setIsOpen(false);
            setShiftId(null);
            setModalData(null);
          }}
          reload={() => setRenderPage((prevCheck) => !prevCheck)}
        />
      </Modal>
    </div>
  );
}
export default DaySchedule;
