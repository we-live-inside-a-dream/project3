import "./App.css";
import EmployeesList from "./pages/manager/EmployeesList";
import { Routes, Route } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import CalendarScratch from "./components/calendar/CalendarScratch";
import axios from "axios";
import NavBar from "./components/navigation/NavBar";
// import EmployeeEditForm from "./components/employee-list/EmployeeEditForm";
import EmployeeAvailabilityPage from "./pages/manager/EmployeeAvailabilityPage";
import EmployeeAvailabilityEditPage from "./pages/manager/EmployeeAvailabilityEditPage";
import AvailabilityDetailPage from "./pages/manager/AvailabilityDetailPage";
// import EmployeeDetail from "./components/employee-list/EmployeeDetail";
import LogIn from "./components/login/LogIn";
import LogOut from "./components/login/LogOut";
import ProfilePage from "./pages/common/ProfilePage";
import CreateEmployeePage from "./pages/manager/CreateEmployeePage";
// import EmployeeDetailPage from "./pages/manager/EmployeeDetailPage";
import EmployeeEditPage from "./pages/manager/EmployeeEditPage";
import GlobalStyle from "./GlobalStyle";
import SchedulePage from "./pages/manager/SchedulePage";
import EmployeeTimeOff from "./components/employee-time-off/EmployeeTimeOff";
import EventsPage from "./pages/common/EventsPage";
import HomeDashBoardPage from "./pages/common/HomeDashBoardPage";
import EmployeeAvailabilityDetail from "./components/employee-availabilities/AvailabilityDetail";
import AuthenticationProvider from "./components/login/AuthenticationProvider";
import MustBeManager from "./components/login/MustBeManager";
import RequireAuth from "./components/login/RequireAuth";
import EmployeeTimeOffPage from "./pages/manager/EmployeeTimeOffPage";
import MessangerPage from "./pages/common/MessangerPage";
import AuthenticationContext from "./components/login/AuthenticationContext";

function App() {
  return (
    <AuthenticationProvider>
      <div
        style={{ display: "grid", gridTemplateRows: "8vh 1fr" }}
        className="App"
      >
        <GlobalStyle />
        <NavBar />
        <Routes>
          <Route
            path="/schedules"
            element={
              <RequireAuth>
                <SchedulePage />
              </RequireAuth>
            }
          />
          <Route
            path="/"
            element={
              // <RequireAuth>
              <HomeDashBoardPage />
              // </RequireAuth>
            }
          />
          <Route path="/employeeList" element={<EmployeesList />} />
          <Route
            path="/availabilities"
            element={<EmployeeAvailabilityPage />}
          />
          {/* <Route path="/employeeDetail/:id" element={<EmployeeDetailPage />} /> */}
          <Route
            path="/employeeDetail/edit/:id"
            element={
              <RequireAuth>
                <EmployeeEditPage />
              </RequireAuth>
            }
          />
          <Route
            path="/createEmployee"
            element={
              // <MustBeManager>
              <CreateEmployeePage />
              // </MustBeManager>
            }
          />
          <Route
            path="/timeOff"
            element={
              // <RequireAuth>
              <EmployeeTimeOff />
              // </RequireAuth>
            }
          />
          <Route path="/createEvent" element={<EventsPage />} />
          <Route
            path="/availability-edit/:id"
            element={
              <RequireAuth>
                <EmployeeAvailabilityEditPage />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<LogIn />} />
          <Route
            path="/logout"
            element={
              <RequireAuth>
                <LogOut />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
          />
          <Route
            path="/chat"
            element={
              <RequireAuth>
                <MessangerPage />
              </RequireAuth>
            }
          />
          <Route
            path="/avail-detail/:id"
            element={<EmployeeAvailabilityDetail />}
          ></Route>
        </Routes>
        )
      </div>
    </AuthenticationProvider>
  );
}

export default App;
