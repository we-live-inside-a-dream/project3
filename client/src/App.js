import "./App.css";

import CalendarComponent from "./components/CalendarComponent";
import CalendarNewShiftForm from "./components/CalendarNewShiftForm";
import DynamicScheduleTrial from "./components/DynamicScheduleTrial";
import EditSchedule from "./components/EditSchedule";
import Modal from "./components/Modal";
import "./App.css";
import { useState } from "react";
import background from "./otherPic.jpg";
import EmployeeProfileList from "./components/StyledComponents/tables/EmployeeProfileList";
import { MomentTest } from "./components/MomentTest";

import {BrowserRouter, Router, Routes, Route, Link} from 'react-router-dom'
// import MuiDatePicker from "./components/MuiDatePicker";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (  
            // <div>
            //   <nav>
            //     <Link to="/">Home</Link>
            //     <Link to="/employeeList">Employee List</Link>
            //     <Link to="/dayView">Schedule Day View</Link>
            //   </nav>
            //   <Routes>
            //     <Route path="/" element={<CalendarComponent />} />
            //     <Route path="/employeeList" element={<EmployeeProfileList />} />
            //     <Route path="/dayView" element={<DynamicScheduleTrial />} />
            //   </Routes>
            //   </div>
    <>
        
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
            
              {/* <EditSchedule />
              <CalendarComponent />
          
            <div className="App">
              {/* <DynamicScheduleTrial />

            <EditSchedule /> */}
              {/* <MuiDatePicker /> */}
              <CalendarComponent />
              <CalendarNewShiftForm />
              <DynamicScheduleTrial />

              <button onClick={() => setIsOpen(true)}> Schedule</button>
              <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <EditSchedule onClose={onclose} />
              </Modal>{" "}
              
              <CalendarComponent />
              <CalendarNewShiftForm style={{ margin: "Auto" }} />
              {/* <EditSchedule /> */}
             
            
          </div>
        
    </>
  );
}

export default App;
