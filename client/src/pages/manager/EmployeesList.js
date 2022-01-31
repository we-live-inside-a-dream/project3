import React from "react";
import StyledPage from "../../components/reusable/styled-page/StyledPage";
import EmployeeProfileList from "../../components/employee-list/EmployeeProfileList";

function EmployeesList() {
  return (
    <div>
      <StyledPage>
        <EmployeeProfileList />
      </StyledPage>
    </div>
  );
}

export default EmployeesList;
