import "./App.css";
// import DynamicScheduleTrial from "./components/DynamicScheduleTrial";
// import EditSchedule from "./components/EditSchedule";
import CalendarComponent from "./components/CalendarComponent";
import CalendarNewShiftForm from "./components/CalendarNewShiftForm";
// import DynamicScheduleTrial from "./components/DynamicScheduleTrial";
import EditSchedule from "./components/EditSchedule";
import Modal from "./Modal";
import "./App.css";
import { useState } from "react";
import background from "./otherPic.jpg";
import EmployeeProfileList from "./components/StyledComponents/tables/EmployeeProfileList";

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
          width: "100%",
          height: "100vh",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* <EditSchedule />
        <CalendarComponent />
    
        <button onClick={() => setIsOpen(true)}> Schedule</button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <EditSchedule onClose={onclose} />
        </Modal> */}
        <CalendarComponent />
        <CalendarNewShiftForm style={{ margin: "Auto" }} />
        {/* <EditSchedule /> */}
        <EmployeeProfileList />
      </div>
    </>
  );
}

export default App;
