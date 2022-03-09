import React, { useState } from "react";
import TimeOffApproval from "../../components/employee-time-off/TimeOffApproval";
import StyledPage from "../../components/reusable/styled-page/StyledPage";
import StyledPageTitle from "../../components/reusable/styled-page/StyledPageTitle";
import ManagerViewOfShiftSwapRequests from "../../components/schedules/shift-swapping/ManagerViewOfShiftSwapRequests";
import StyledApprovalsButtonGroup from "../../components/employee-time-off/StyledApprovalsButtonGroup";

const ApprovalPage = () => {
  const [currentTab, setCurrentTab] = useState(1);
  return (
    <div style={{ position: "relative" }}>
      <StyledPage
        style={
          {
            // alignContent: "center",
          }
        }
      >
        <StyledPageTitle style={{ marginBottom: "40px" }}>
          Approvals Page
        </StyledPageTitle>
        <div
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            // alignContent: "center",
          }}
        >
          <StyledApprovalsButtonGroup
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            style={{ position: "absolute" }}
          />
          <div style={{ position: "absolute" }}>
            {currentTab === 1 && <TimeOffApproval />}
            {currentTab === 2 && <ManagerViewOfShiftSwapRequests />}
          </div>
        </div>
      </StyledPage>
    </div>
  );
};

export default ApprovalPage;
