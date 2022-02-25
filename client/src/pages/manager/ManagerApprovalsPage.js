import React, { useState } from "react";
import TimeOffApproval from "../../components/employee-time-off/TimeOffApproval";
import StyledPage from "../../components/reusable/styled-page/StyledPage";
import StyledPageTitle from "../../components/reusable/styled-page/StyledPageTitle";
import ManagerViewOfShiftSwapRequests from "../../components/schedules/shift-swapping/ManagerViewOfShiftSwapRequests";
import StyledApprovalsButtonGroup from "../../components/employee-time-off/StyledApprovalsButtonGroup";

const ApprovalPage = () => {
  const [currentTab, setCurrentTab] = useState(1);
  return (
    <div>
      <StyledPage>
        <StyledPageTitle style={{ marginBottom: "40px" }}>
          APPROVALS PAGE
        </StyledPageTitle>
        <div>
          <StyledApprovalsButtonGroup
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
          {currentTab === 1 && <TimeOffApproval />}
          {currentTab === 2 && <ManagerViewOfShiftSwapRequests />}
        </div>
      </StyledPage>
    </div>
  );
};

export default ApprovalPage;
