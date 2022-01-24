import React, { useEffect, useState } from "react";
import EditSchedule from "../edit-schedule/EditSchedule";
import StyledTableHeader from "../reusable/tables/StyledTableHeader";

import StyledTable from "../reusable/tables/StyledTable";
import Modal from "../../components/reusable/Modal";
import ShiftComponent from "../edit-schedule/ShiftComponent";
import StyledButton from "../reusable/Inputs/StyledButton";

// const selectedSchedule =({})=>(

//     <Modal  open={isOpen} onClose={() => setIsOpen(false)}>
//       <EditSchedule onClose={() => setIsOpen(false)} />
//     </Modal>
//   )

function DynamicSchedule() {
  const [shift,setShift] = useState();
  const [schedule, setSchedule] = useState([]);
  const [day, setDay] = useState("2022-01-14");
  const [isOpen, setIsOpen] = useState();
  const [shiftId,setShiftId] = useState()

  
  useEffect(() => {
    console.log("shiftId is",shiftId);
    const fetchShift = async () => {
      let fetchResult = await fetch(`/api/schedule/id?id=${shiftId}`);
      console.log("fetch result", fetchResult);
      let fetchedShift = await fetchResult.json();
      console.log("fetchedShift is", fetchedShift);
      setShift(fetchedShift);
      setIsOpen(true)
    };
    fetchShift();
  }, [shiftId]);

  useEffect(() => {
    console.log("day is ", day);
    const fetchSchedule = async () => {
      let fetchResult = await fetch(`/api/schedule/day?day=${day}`);
      console.log("fetch result", fetchResult);
      let fetchedDay = await fetchResult.json();
      console.log("fetchedDay is", fetchedDay);

      setSchedule(fetchedDay);
    };
    fetchSchedule();
  }, [day]);

  let startTime = 8;
  let endTime = 18;
  let businessHours = [];
  let headerHours = [];
  for (let i = startTime; i < endTime; i += 0.25) {
    businessHours.push(i);
    headerHours.push(i < 13 ? i : i - 12);
  }
  // console.log(businessHours);

  function selectTheDay(day) {
    console.log("THE DAY FROM THE FUNCTION IS", day);
    setDay(day);
  }

function convertTime(prop){
    let timeString = (prop.slice(0,2)) + ((prop.slice(3)/60).toString().slice(1))
    // console.log(timeString,"new String")
    return(timeString)
}
   
   async function deleteShift(shiftId) {

  await fetch(`/api/schedule/schedule/delete?id=${shiftId}`, {
      method: 'DELETE',
  })}


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

        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <EditSchedule shiftId={shiftId} existingValues={shift} onClose={() => setIsOpen(false)} />
          **edit**
        </Modal>
        <tbody>
          {schedule?.map((employee, index) => ( 
          // <ShiftComponent businessHours = {businessHours} setShiftId = {setShiftId} employee = {employee} index ={index} /> 
            <tr key={index} >
              <td key={index} onClick={() => setShiftId(employee._id)} >
                <div style={{ display: "inline-flex" }}>
                  <div
                    style={{
                      backgroundColor: "grey",
                      height: "3rem",
                      width: "2rem",
                      marginRight: "10px",
                      alignSelf: "center",
                    }}
                    ></div>
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
                      {employee.start.slice(0,2)}-{employee.end.slice(0,2)}
                    </p>
                  </div>
                 
                </div> 
              </td>
              
          
              {businessHours?.map((hour, index) => {
                
                if(hour >= convertTime(employee.start) && hour < convertTime(employee.end)) {
                  return (
                    <td key={index} onClick={() => setShiftId(employee._id)}>
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
              <td><StyledButton onClick ={()=>deleteShift(shiftId)}>X</StyledButton></td>
            </tr>
              
              
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
}
export default DynamicSchedule;
