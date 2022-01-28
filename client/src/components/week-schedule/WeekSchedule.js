import React, { useEffect, useState } from "react";
import EditSchedule from "../edit-schedule/EditSchedule";
import StyledTableHeader from "../reusable/tables/StyledTableHeader";
import moment from "moment";
import * as fns from "date-fns";
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
  // const [employeeId, setEmployeeId] = useState()
  const [ empAvailibility,setEmpAvailibility] = useState([])
  const [date,setDate] = useState()

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

      empAvailibility.forEach(element => console.log(element.days[0]));
    }


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
        datesArray.push(firstDate.clone().format("dddd, Do").toString());
        dateNumberArray.push(firstDate.clone().format("yyyy-MM-DD").toString());
      }
      setTitleWeek(datesArray);
      setDataWeek(dateNumberArray);
      fetchAllTheDays();
    };
    empAvail()
    getAllTheEmployees();
    findDateRange();
  }, [startDay]);

  // empAvailibility.forEach(element => console.log(element.days[dayOfWeek]));

  function isEmployeeAvailible(id,date){
    let dayOfWeek = fns.getDay(new Date(date)); 
   
// let currentEmployee = empAvailibility.find(employeeprofile.Id === id)

let currentEmployee = empAvailibility.find((post)=>{
  if(post.employeeProfileId===id)
    return true
})
console.log( currentEmployee)



let today = currentEmployee.days[0]
    
// let currentEmployee = (employeeprofile.Id === id)
// let currentAvailibility = empAvailibility.find(currentEmployee)
console.log("current employee...",today)
   
// let currentDay = empAvailibility.find((currentDay) => {
//   return (                   
//     currentDay.employeeId)

  //dayOfweek is the index for days array monday=0, sunday=6
  // let availibleToday = currentAvailibility.days[dayOfWeek]
  // if(!availibleToday.available){
  //   console.log("employee not availible");
  // }else if(!availibleToday.allDay){
  //   console.log(`employee is availible between ${availibleToday.start} and ${availibleToday.end}`);
  // }else{
  //   console.log("employee is free to suffer all day!!");
  // }
}

  // useEffect(()=>{
  //   if(employeeId){
      
  //     console.log("employeeId",employeeId)
  //     const empAvail = async ()=>{ 
  //       let fetchAvailibility = await fetch(`/api/availability/availibility-all}`)
  //       let employeeAvailibility = await fetchAvailibility.json()
  //       setEmpAvailibility(employeeAvailibility) 
  //     }
  //     empAvail()
  //   }
  //   // console.log(empAvailibility)
  // },[employeeId])
  
  // useEffect(()=>{
  //     // need to ensure employee isnt working over 40 hours this week
  //     // need to see if employee has vacation or time off booked
  //     // need to compare day of the week to weekly availibility 
  //     //       first figure out what day of the week it is...
  //     console.log('employee weekly availibility',availibleToday)
  //   }
  //   let dayOfWeek = fns.getDay(new Date(date));  
  // if(empAvailibility){ console.log(empAvailibility)
  //   console.log("date is...",date)
  //   console.log("week day is...",dayOfWeek,"of 6" )//monday = 0 sunday = 6
  //   isEmployeeAvailible()
  // };
  // },[date])




  

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
                <div
                  style={{
                    display: "grid",
                    width: "12rem",
                    gridTemplateColumns: "5% 25% 70%",
                  }}
                >
                  <div style={{ gridRow: "1" }}></div>
                  <div>
                    <div
                      style={{
                        gridRow: "1",
                        backgroundColor: "grey",
                        height: "2.5rem",
                        width: "2.5rem",
                        margin: "auto",
                        alignSelf: "center",
                        borderRadius: "50%",
                      }}
                    ></div>
                  </div>

                  <div
                    style={{
                      margin: "auto 10px auto 10px",
                      color: "#4488AB",
                      fontWeight: "600",
                      display: "block",
                      textShadow: "none",
                      textAlign: "left",
                    }}
                  >
                    <p>{`${employee.firstName} ${employee.lastName.slice(
                      0,
                      1
                    )}`}</p>
                    <p
                      style={{
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
                  isEmployeeAvailible(employee._id,date)
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
                  >{`${shift.start}-${shift.end} `}</td>
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
