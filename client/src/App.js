import "./App.css";
import CalendarComponent from "./components/UNUSED/CalendarComponent";
import DaySchedulePage from "./pages/common/DaySchedulePage";
import EmployeesList from "./pages/manager/EmployeesList";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
// import background from "./assets/boldPic.jpg";
import CalendarScratch from "./components/calendar/CalendarScratch";
import axios from "axios";
import NavBar from "./components/navigation/NavBar";

// import EmployeeEditForm from "./components/employee-list/EmployeeEditForm";
import EmployeeAvailabilityPage from "./pages/manager/EmployeeAvailabilityPage";
import EmployeeAvailabilityEditPage from "./pages/manager/EmployeeAvailabilityEditPage";
import AvailabilityDetailPage from "./pages/manager/AvailabilityDetailPage";
import WeekSchedulePage from "./pages/manager/WeekSchedulePage";
// import EmployeeDetail from "./components/employee-list/EmployeeDetail";
import LogIn from "./components/login/LogIn";
import LogOut from "./components/navigation/LogOut";
// import ProfilePage from "./pages/common/ProfilePage";
import CreateEmployeePage from "./pages/manager/CreateEmployeePage";
import EmployeeDetailPage from "./pages/manager/EmployeeDetailPage";
import EmployeeEditPage from "./pages/EmployeeEditPage";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%
  }
  body {
    font-family: Arial, Helvetica, sans-serif;
    background: linear-gradient(to bottom, #f05053, #e1eec3);
    height: 100%;
    margin: 0;
    color: #555;
  }
  :root {
  --primary-color:  red;



  }
`;

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
        backgroundColor: "white",
        // backgroundImage: "url(" + background + ")",
      }}
    >
      <GlobalStyle />
      <NavBar />

      <Routes>
        {/* <Route path="/createEmployee" element={<EmployeeEditForm />} /> */}
        {/* <Route path="/" element={<CalendarComponent />} /> */}
        <Route path="/" element={<CalendarScratch />} />
        <Route path="/employeeList" element={<EmployeesList />} />
        <Route path="/createEmployee" element={<CreateEmployeePage />} />
        <Route path="/dayView" element={<DaySchedulePage />} />
        <Route path="/weekView" element={<WeekSchedulePage />} />
        <Route path="/availabilities" element={<EmployeeAvailabilityPage />} />
        <Route path="/employeeDetail/:id" element={<EmployeeDetailPage />} />
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
