import "./App.css";
import EmployeesList from "./pages/manager/EmployeesList";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import CalendarScratch from "./components/calendar/CalendarScratch";
import axios from "axios";
import NavBar from "./components/navigation/NavBar";
// import EmployeeEditForm from "./components/employee-list/EmployeeEditForm";
import EmployeeAvailabilityPage from "./pages/manager/EmployeeAvailabilityPage";
import EmployeeAvailabilityEditPage from "./pages/manager/EmployeeAvailabilityEditPage";
import AvailabilityDetailPage from "./pages/manager/AvailabilityDetailPage";
// import EmployeeDetail from "./components/employee-list/EmployeeDetail";
import LogIn from "./components/login/LogIn";
import LogOut from "./components/navigation/LogOut";
// import ProfilePage from "./pages/common/ProfilePage";
import CreateEmployeePage from "./pages/manager/CreateEmployeePage";
// import EmployeeDetailPage from "./pages/manager/EmployeeDetailPage";
import EmployeeEditPage from "./pages/manager/EmployeeEditPage";
import GlobalStyle from "./GlobalStyle";
import SchedulePage from "./pages/manager/SchedulePage";

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
      style={{ display: "grid", gridTemplateRows: "8vh 1fr" }}
      className="App"
    >
      <GlobalStyle />
      <NavBar />

      <Routes>
        <Route path="/schedules" element={<SchedulePage />} />

        <Route path="/" element={<CalendarScratch />} />
        <Route path="/employeeList" element={<EmployeesList />} />

        <Route path="/availabilities" element={<EmployeeAvailabilityPage />} />
        {/* <Route path="/employeeDetail/:id" element={<EmployeeDetailPage />} /> */}
        <Route path="/employeeDetail/edit/:id" element={<EmployeeEditPage />} />
        <Route
          path="/availability-edit/:id"
          element={<EmployeeAvailabilityEditPage />}
        />
        {/* <Route path="/LogIn" element={<LogIn setUser={setUser} />} />
        <Route path="/logOut" element={<LogOut setUser={setUser} />} /> */}
        {/* <Route path="/profile" element={<ProfilePage user={user} />} /> */}
        <Route
          path="/availability-detail/:id"
          element={<AvailabilityDetailPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
