import "./App.css";
import CalendarComponent from "./components/UNUSED/CalendarComponent";
// import CalendarNewShiftForm from "./components/CalendarNewShiftForm";
import "./App.css";
// import { useState } from "react";
import background from "./assets/boldPic.jpg";
import DaySchedule from "./pages/common/DaySchedule";
import EmployeesList from "./pages/manager/EmployeesList";
import { BrowserRouter, Router, Routes, Route, Link } from "react-router-dom";
import StyledLink from "./components/navigation/StyledNavBar";
import NavBar from "./components/navigation/NavBar";
import EmployeeEditForm from "./components/employee-list/EmployeeEditForm";
import EmployeeAvailabilityPage from "./pages/manager/EmployeeAvailabilityPage";
import EmployeeAvailabilityEditPage from "./pages/manager/EmployeeAvailabilityEditPage";
import LogIn from "./components/login/LogIn";
import LogOut from "./components/navigation/LogOut";
import axios from "axios";
import { useEffect, useState } from "react";
import ProfilePage from "./pages/common/ProfilePage";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    axios.post("/user/loggedInUser").then(function (response) {
      if (response.data) {
        setUser(response.data);
        console.log(response);
      }
    });
  }, []);
  return (
    <div
      className="App"
      style={{
        backgroundImage: "url(" + background + ")",
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
        <Route path="/profile" element={<ProfilePage user={user} />} />
        <Route path="/logIn" element={<LogIn setUser={setUser} />} />
        <Route path="/logOut" element={<LogOut setUser={setUser} />} />
      </Routes>
    </div>
  );
}

export default App;
