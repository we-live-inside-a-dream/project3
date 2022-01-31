import EmployeeAvailabilityForm from "../../components/employee-availabilities/EmployeeAvailabilityForm";
import StyledPage from "../../components/reusable/styled-page/StyledPage";

import React from "react";

function EmployeeAvailabilityEditPage() {
  return (
    <div>
      <StyledPage>
        <EmployeeAvailabilityForm />
      </StyledPage>
    </div>
  );
}

export default EmployeeAvailabilityEditPage;
