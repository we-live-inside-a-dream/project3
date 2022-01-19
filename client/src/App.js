import "./App.css";
import CalendarComponent from "./components/UNUSED/CalendarComponent";
import CalendarNewShiftForm from "./components/CalendarNewShiftForm";
import EditSchedule from "./components/EditSchedule";
import Modal from "./components/Modal";
import "./App.css";
import { useState } from "react";
import background from "./otherPic.jpg";
import DaySchedule from "./components/pages/DaySchedule";
// import DynamicSchedule from "./components/StyledComponents/tables/DynamicSchedule";
import { MomentTest } from "./components/MomentTest";
import EmployeesList from "./components/pages/EmployeesList";
import { BrowserRouter, Router, Routes, Route, Link } from "react-router-dom";
import StyledLink from "./components/StyledComponents/NavBar/StyledNavBar";
import NavBar from "./components/NavBar";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeEditForm from "./components/EmployeeEditForm";

// import MuiDatePicker from "./components/MuiDatePicker";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    
    <div
      className="App"
      style={{
        backgroundImage: "url(" + background + ")",
        backgroundSize: "cover",
        backgroundPositionY: "70%",
        backgroundPositionX: "center",
        width: "100%",
        height: "100vh",
        backgroundRepeat: "no-repeat",
      }}
    >
      <NavBar />
      {/* <nav>
                    <Link to="/">Home</Link>
                    <Link to="/employeeList">Employee List</Link>
                    <Link to="/dayView">Schedule Day View</Link>
                  </nav> */}
      <Routes>
        <Route path="/createEmployee" element={<EmployeeEditForm />}/>
        <Route path="/" element={<CalendarComponent />} />
        <Route path="/employeeList" element={<EmployeesList />} />
        <Route path="/dayView" element={<DaySchedule />} />
      </Routes>
      
   
      {/* <EditSchedule />
              <CalendarComponent />
          
              <div className="App">
                {/* <DynamicScheduleTrial />

              <EditSchedule /> */}
      {/* <MuiDatePicker /> */}
      {/* <CalendarComponent />
      <CalendarNewShiftForm />
      <button onClick={() => setIsOpen(true)}> Schedule</button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <EditSchedule onClose={onclose} />
      </Modal>{" "}
      <CalendarComponent />
      <CalendarNewShiftForm style={{ margin: "Auto" }} /> */}
      {/* <EditSchedule /> */}
    </div>
    //     {/* <EditSchedule /> */}
    //       {/* <MuiDatePicker /> */}
    //       <CalendarComponent />
    //       <CalendarNewShiftForm />
    //       <DynamicScheduleTrial />

    //       <button onClick={() => setIsOpen(true)}> Schedule</button>
    //       <Modal open={isOpen} onClose={() => setIsOpen(false)}>
    //         <EditSchedule onClose={onclose} />
    //       </Modal>{" "}

    //       <CalendarComponent />
    //       <CalendarNewShiftForm style={{ margin: "Auto" }} />
    //       {/* <EditSchedule /> */}

    //   </div>
    //  */}
    
  );
}

export default App;
