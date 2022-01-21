import React from "react";
import StyledPage from "../../components/reusable/StyledPage";
import EmployeeAvailabilityList from "../../components/employee-availabilities/EmployeeAvailabilityList";

function EmployeeAvailabilityPage() {
  return (
    <div>
      <StyledPage>
        <EmployeeAvailabilityList />
      </StyledPage>
    </div>
  );
}

export default EmployeeAvailabilityPage;
