import React, { useEffect, useState } from "react";
import { useNavigate} from 'react-router-dom'
import EditSchedule from "../edit-schedule/EditSchedule";
import StyledTableHeader from "../reusable/tables/StyledTableHeader";
import StyledTable from "../reusable/tables/StyledTable";
import Modal from "../reusable/Modal";
// import ShiftComponent from "../edit-schedule/ShiftComponent";
import StyledButton from "../reusable/Inputs/StyledButton";
import StyledEditButton from "../reusable/Inputs/StyledEditButton";


function DaySchedule() {
  const [shift, setShift] = useState();
  const [schedule, setSchedule] = useState([]);
  const [day, setDay] = useState("2022-01-14");
  const [isOpen, setIsOpen] = useState();
  const [shiftId, setShiftId] = useState("");
  const [deleteShift, setDeleteShift] = useState(false);
  

  useEffect(() => {
    if(shiftId){

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
  }, [shiftId]);

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

  function selectTheDay(day) {
    console.log("THE DAY FROM THE FUNCTION IS", day);
    setDay(day);
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
        Staff Schedule for {day}
        <input
          type="date"
          id="single-day"
          name="day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </h1>
      <StyledTable>
        <thead>
          <tr>
            <th>NAME</th>
            {headerHours?.map((hour) => {
              if (hour === Math.floor(hour)) {
                return (
                  <StyledTableHeader style={{ width: "50px", padding: "0px" }}>
                    {hour}
                  </StyledTableHeader>
                );
              } else if (hour - 0.5 === Math.floor(hour)) {
                return (
                  <StyledTableHeader
                    style={{
                      width: "50px",
                      padding: "0px",
                    }}
                  ></StyledTableHeader>
                );
              } else
                return (
                  <StyledTableHeader
                    style={{
                      width: "50px",
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
                      // onClick={() => deleteEmployeeShift(employee._id)}
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
                    <p>{employee.firstName} </p>

                    <p>{employee.lastName}</p>

                    <p
                      style={{
                        textShadow: "none",
                        color: "#545454",
                        fontSize: ".7rem",
                      }}
                    >
                      {/* {employee.start.slice(0, 2)}-{employee.end.slice(0, 2)} */}
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

              {businessHours?.map((hour, index) => {
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
        </tbody>
      </StyledTable>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <EditSchedule
            shiftId={shiftId}
            existingValues={shift}
            onClose={(() => setIsOpen(false))
            }
          />
          **edit**
        </Modal>
    </div>
  );
}
export default DaySchedule;
