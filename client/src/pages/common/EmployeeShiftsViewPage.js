import React, { useContext } from "react";
import { StyledButton } from "../../components/reusable/Inputs/StyledEmployeeForm";
import StyledPage from "../../components/reusable/styled-page/StyledPage";
import StyledPageTitle from "../../components/reusable/styled-page/StyledPageTitle";
// import AuthenticationContext from "../../components/login/AuthenticationContext";

import EmployeeUpcomingShiftTable from "../../components/schedules/week-schedule/EmployeeUpcomingShiftTable";
function EmployeeShiftsViewPage() {
  return (
    <div>
      <StyledPage>
        <StyledPageTitle style={{ marginBottom: "50px" }}>
          MY UPCOMING SHIFTS
        </StyledPageTitle>
        <EmployeeUpcomingShiftTable />
      </StyledPage>
    </div>
  );
}

export default EmployeeShiftsViewPage;
