import "./App.css";
import { Routes, Route } from "react-router-dom";
// import axios from "axios";
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
// import EmployeeTimeOffForm from "./components/employee-time-off/EmployeeTimeOffForm";
import EventsPage from "./pages/common/EventsPage";
import HomeDashBoardPage from "./pages/common/HomeDashBoardPage";
import EmployeeAvailabilityDetail from "./components/employee-availabilities/AvailabilityDetail";
import AuthenticationProvider from "./components/login/AuthenticationProvider";
import Manager from "./components/login/MustBeManager";
import RequireAuth from "./components/login/RequireAuth";
import EmployeesMenuPage from "./pages/manager/EmployeesMenuPage";
import MessangerPage2 from "./pages/common/MessangerPage2";
import EmployeeUpcomingShiftList from "./components/dashboard/EmployeeUpcomingShiftList";
import TimeOffApprovalPage from "./pages/manager/TimeOffApprovalPage";
import EmployeeTimeOffViewPage from "./pages/common/EmployeeTimeOffViewPage";
// import NotificationProvider from "./components/reusable/context/NotificationProvider";
import ViewEventsPage from "./pages/common/ViewEventsPage";
import { SocketProvider } from "./components/reusable/context/SocketProvider";
import ChatPopupWindow from "./components/messanger2/ChatPopupWindow.js";
// import EmployeeTimeOffForm from "./components/employee-time-off/EmployeeTimeOffForm";
// import TimeOffPage from "./pages/common/TimeOffPage";
// import ErrorUnauthorizedUser from "./pages/common/ErrorUnauthorizedUser";

function App() {
  return (
    <AuthenticationProvider>
      <SocketProvider>
        <div
          style={{ display: "grid", gridTemplateRows: "8vh 1fr" }}
          className="App"
        >
          <ChatPopupWindow />
          <GlobalStyle />
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <HomeDashBoardPage />
                </RequireAuth>
              }
            />
            <Route
              path="/events"
              element={
                <RequireAuth>
                  <EventsPage />
                </RequireAuth>
              }
            />
            <Route
              path="/viewevents"
              element={
                <RequireAuth>
                  <ViewEventsPage />
                </RequireAuth>
              }
            />
            <Route
              path="/schedules"
              element={
                <RequireAuth>
                  <ScheduleMenuPage />
                </RequireAuth>
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
                <RequireAuth>
                  <EmployeeEditPage />
                </RequireAuth>
              }
            />
            <Route
              path="/createEmployee"
              element={
                <RequireAuth>
                  <CreateEmployeePage />
                </RequireAuth>
              }
            />
            {/* <Route
            path="/timeOff"
            element={
              <RequireAuth>
                <EmployeeTimeOffForm />
              </RequireAuth>
            }
          /> */}
            <Route
              path="/timeOff/page"
              element={
                <RequireAuth>
                  <EmployeeTimeOffViewPage />
                </RequireAuth>
              }
            />
            <Route
              path="/human-resources"
              element={
                <Manager>
                  <EmployeesMenuPage />
                </Manager>
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
            {/* <Route
            path="/unauthorized"
            element={
              <RequireAuth>
              <ErrorUnauthorizedUser />
              </RequireAuth> 
            }
          /> */}
            <Route
              path="/chat"
              element={
                <RequireAuth>
                  <MessangerPage2 />
                </RequireAuth>
              }
            />
            <Route
              path="/avail-detail/:id"
              element={<EmployeeAvailabilityDetail />}
            ></Route>
            <Route
              path="/timeOff/approval"
              element={<TimeOffApprovalPage />}
            ></Route>

            {/* last router */}
          </Routes>
          )
        </div>
      </SocketProvider>
    </AuthenticationProvider>
  );
}

export default App;
