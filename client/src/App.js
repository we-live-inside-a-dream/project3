import "./App.css";
// import DynamicScheduleTrial from "./components/DynamicScheduleTrial";
// import EditSchedule from "./components/EditSchedule";
import CalendarComponent from "./components/CalendarComponent";
import CalendarNewShiftForm from "./components/CalendarNewShiftForm";
import EditSchedule from "./components/EditSchedule";
import Modal from "./Modal";
import "./App.css";
import { useState } from "react";
import background from "./otherPic.jpg";
import DynamicSchedule from "./components/StyledComponents/tables/DynamicSchedule";
import EmployeeProfileList from "./components/StyledComponents/tables/EmployeeProfileList";
import CalendarScratch from "./components/calendar/CalendarScratch";
import DaySchedule from "./components/pages/DaySchedule";
// import MuiDatePicker from "./components/MuiDatePicker";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        className="App"
        style={{
          backgroundImage: "url(" + background + ")",
          backgroundSize: "cover",
          backgroundPositionY: "70%",
          backgroundPositionX: "center",
          width: "full",
          height: "100vh",
          backgroundRepeat: "no-repeat",
          margin: "auto",
        }}
      >
        <DaySchedule />
        {/*        
      <EditSchedule /> */}
        {/* <MuiDatePicker /> */}
        {/* <CalendarNewShiftForm />
        <button onClick={() => setIsOpen(true)}> Schedule</button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <EditSchedule onClose={onclose} />
        </Modal>
        <CalendarComponent />
        <CalendarNewShiftForm style={{ margin: "Auto" }} />
        <EmployeeProfileList /> */}
      </div>
    </>
  );
}

export default App;
