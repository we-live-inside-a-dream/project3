import React from "react";
import StyledPage from "../StyledComponents/StyledPage";
import EmployeeAvailabilityList from "../StyledComponents/tables/EmployeeAvailabilityList";

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
