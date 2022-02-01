import React, { useEffect, useState } from "react";
import StyledPage from "../../components/reusable/styled-page/StyledPage";
import EmployeeAvailabilityList from "../../components/employee-availabilities/EmployeeAvailabilityList";
import AvailabilityDetail from "../../components/employee-availabilities/AvailabilityDetail";
import StyledButton from "../../components/reusable/Inputs/StyledButton";

function EmployeeAvailabilityPage() {
  return (
    <StyledPage>
      <EmployeeAvailabilityList />
    </StyledPage>
  );
}

export default EmployeeAvailabilityPage;
