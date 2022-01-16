// import DynamicScheduleTrial from "./components/DynamicScheduleTrial";
// import EditSchedule from "./components/EditSchedule";
import CalendarComponent from "./components/CalendarComponent";
import CalendarNewShiftForm from "./components/CalendarNewShiftForm";
import DynamicScheduleTrial from "./components/DynamicScheduleTrial";
import EditSchedule from "./components/EditSchedule";
import Modal from "./Modal";
import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="App">
        {/* <DynamicScheduleTrial />

      <EditSchedule /> */}
        <CalendarComponent />
        <CalendarNewShiftForm />
        <DynamicScheduleTrial />

        <button onClick={() => setIsOpen(true)}> Schedule</button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <EditSchedule onClose={onclose} />
        </Modal>
      </div>
      <div></div>
    </>
  );
}

export default App;
