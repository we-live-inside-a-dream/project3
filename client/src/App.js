import "./App.css";
import CalendarComponent from "./components/UNUSED/CalendarComponent";
import "./App.css";
// import { useState } from "react";
// import background from "./assets/boldPic.jpg";
import DaySchedule from "./pages/common/DaySchedule";
import EmployeesList from "./pages/manager/EmployeesList";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/navigation/NavBar";
import EmployeeEditForm from "./components/employee-list/EmployeeEditForm";
import EmployeeAvailabilityPage from "./pages/manager/EmployeeAvailabilityPage";
import EmployeeAvailabilityEditPage from "./pages/manager/EmployeeAvailabilityEditPage";
import AvailabilityDetailPage from "./pages/manager/AvailabilityDetailPage";

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

        <Route
          path="/availability-detail/:id"
          element={<AvailabilityDetailPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
