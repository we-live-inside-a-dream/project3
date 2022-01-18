import "./App.css";
import DynamicScheduleTrial from "./components/DynamicScheduleTrial";
// import EditSchedule from "./components/EditSchedule";
import CalendarComponent from "./components/CalendarComponent";
import CalendarNewShiftForm from "./components/CalendarNewShiftForm";
import EditSchedule from "./components/EditSchedule";
import Modal from "./Modal";
import { useState } from "react";
import background from "./otherPic.jpg";
// import DynamicSchedule from "./components/StyledComponents/tables/DynamicSchedule";
import EmployeeProfileList from "./components/StyledComponents/tables/EmployeeProfileList";
import { BrowserRouter, Router, Routes, Route, Link } from "react-router-dom";
import DaySchedule from "./components/pages/DaySchedule";
// import MuiDatePicker from "./components/MuiDatePicker";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="App"
      style={{
        backgroundImage: "url(" + background + ")",
      }}
    >
      <nav>
        <Link to="/">Home</Link>
        <Link to="/employeeList">Employee List</Link>
        <Link to="/dayView">Schedule Day View</Link>
      </nav>
      <Routes>
        <Route path="/" element={<CalendarComponent />} />
        <Route path="/employeeList" element={<EmployeeProfileList />} />
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
      {/* <DynamicScheduleTrial /> */}
      {/* <button onClick={() => setIsOpen(true)}> Schedule</button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <EditSchedule onClose={onclose} />
      </Modal>{" "}
      <CalendarComponent />
      <CalendarNewShiftForm style={{ margin: "Auto" }} /> */}{" "}
      {/* <EditSchedule /> */}
    </div>
  );
}

export default App;
