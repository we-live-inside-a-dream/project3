import "./App.css";
import CalendarComponent from "./components/UNUSED/CalendarComponent";
// import CalendarNewShiftForm from "./components/CalendarNewShiftForm";
import "./App.css";
// import { useState } from "react";
// import background from "./assets/boldPic.jpg";
import DaySchedule from "./pages/common/DaySchedule";
import EmployeesList from "./pages/manager/EmployeesList";
import { BrowserRouter, Router, Routes, Route, Link } from "react-router-dom";
import StyledLink from "./components/navigation/StyledNavBar";
import NavBar from "./components/navigation/NavBar";
import EmployeeEditForm from "./components/employee-list/EmployeeEditForm";
import EmployeeAvailabilityPage from "./pages/manager/EmployeeAvailabilityPage";
import EmployeeAvailabilityEditPage from "./pages/manager/EmployeeAvailabilityEditPage";

function App() {
  return (
    <div
      className="App"
      style={{
        backgroundColor: "white",
        // backgroundImage: "url(" + background + ")",
      }}
    >
      <NavBar />

      <Routes>
        <Route path="/createEmployee" element={<EmployeeEditForm />} />
        <Route path="/" element={<CalendarComponent />} />
        <Route path="/employeeList" element={<EmployeesList />} />
        <Route path="/dayView" element={<DaySchedule />} />
        <Route path="/availabilities" element={<EmployeeAvailabilityPage />} />
        <Route
          path="/availability-edit/:id"
          element={<EmployeeAvailabilityEditPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
