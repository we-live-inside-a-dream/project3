import "./App.css";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import NavBar from "./components/navigation/NavBar";
// import EmployeeEditForm from "./components/employee-list/EmployeeEditForm";
import EmployeeAvailabilityPage from "./pages/manager/EmployeeAvailabilityPage";
import EmployeeAvailabilityEditPage from "./pages/manager/EmployeeAvailabilityEditPage";
import LogIn from "./components/login/LogIn";
import LogOut from "./components/login/LogOut";
import ProfilePage from "./pages/common/ProfilePage";
import CreateEmployeePage from "./pages/manager/CreateEmployeePage";
import EmployeeEditPage from "./pages/manager/EmployeeEditPage";
import GlobalStyle from "./GlobalStyle";
import ScheduleMenuPage from "./pages/manager/ScheduleMenuPage";
import EmployeeTimeOff from "./components/employee-time-off/EmployeeTimeOff";
import EventsPage from "./pages/common/EventsPage";
import HomeDashBoardPage from "./pages/common/HomeDashBoardPage";
import EmployeeAvailabilityDetail from "./components/employee-availabilities/AvailabilityDetail";
import AuthenticationProvider from "./components/login/AuthenticationProvider";
import MustBeManager from "./components/login/MustBeManager";
import RequireAuth from "./components/login/RequireAuth";
import EmployeesMenuPage from "./pages/manager/EmployeesMenuPage";
import MessangerPage2 from "./pages/common/MessangerPage2";
import EmployeeUpcomingShiftList from "./components/dashboard/EmployeeUpcomingShiftList";

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
            path="/"
            element={
              // <RequireAuth>
              <HomeDashBoardPage />
              // </RequireAuth>
            }
          />
          <Route
            path="/schedules"
            element={
              // <RequireAuth>
              <ScheduleMenuPage />
              // </RequireAuth>
            }
          />

          {/* <Route path="/employeeList" element={<EmployeesList />} /> */}
          <Route
            path="/availabilities"
            element={<EmployeeAvailabilityPage />}
          />
          <Route path="/my-page" element={<EmployeeUpcomingShiftList />} />
          {/* <Route path="/employeeDetail/:id" element={<EmployeeDetailPage />} /> */}
          <Route
            path="/employeeDetail/edit/:id"
            element={
              // <RequireAuth>
              <EmployeeEditPage />
              // </RequireAuth>
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
          <Route
            path="/human-resources"
            element={
              // <RequireAuth>
              <EmployeesMenuPage />
              // </RequireAuth>
            }
          />
          <Route path="/createEvent" element={<EventsPage />} />
          <Route
            path="/availability-edit/:id"
            element={
              // <RequireAuth>
                <EmployeeAvailabilityEditPage />
              // </RequireAuth>
            }
          />
          <Route path="/login" element={<LogIn />} />
          <Route
            path="/logout"
            element={
              // <RequireAuth>
                <LogOut />
              // </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              // <RequireAuth>
                <ProfilePage />
              // </RequireAuth>
            }
          />
          <Route
            path="/chat"
            element={
              // <RequireAuth>
              <MessangerPage2 />
              // </RequireAuth>
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
