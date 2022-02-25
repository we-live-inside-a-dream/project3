import React from "react";
import TimeOffApproval from "../../components/employee-time-off/TimeOffApproval";
import StyledPage from "../../components/reusable/styled-page/StyledPage";
import StyledPageTitle from "../../components/reusable/styled-page/StyledPageTitle";
import ManagerViewOfShiftSwapRequests from "../../components/schedules/shift-swapping/ManagerViewOfShiftSwapRequests";

const TimeOffApprovalPage = () => {
  return (
    <div>
      <StyledPage>
        <StyledPageTitle style={{ marginBottom: "40px" }}>
          APPROVALS PAGE
        </StyledPageTitle>
        <TimeOffApproval />
        <ManagerViewOfShiftSwapRequests />
      </StyledPage>
    </div>
  );
};

export default TimeOffApprovalPage;
