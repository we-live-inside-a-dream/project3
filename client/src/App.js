import "./App.css";
import CalendarComponent from "./components/UNUSED/CalendarComponent";
// import CalendarNewShiftForm from "./components/CalendarNewShiftForm";
import "./App.css";
// import { useState } from "react";
import background from "./boldPic.jpg";
import DaySchedule from "./components/pages/DaySchedule";
import EmployeesList from "./components/pages/EmployeesList";
import { BrowserRouter, Router, Routes, Route, Link } from "react-router-dom";
import StyledLink from "./components/StyledComponents/NavBar/StyledNavBar";
import NavBar from "./components/NavBar";
import EmployeeEditForm from "./components/EmployeeEditForm";
import EmployeeAvailabilityPage from "./components/pages/EmployeeAvailabilityPage";
import EmployeeAvailabilityEditPage from "./components/pages/EmployeeAvailabilityEditPage";

function App() {
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
