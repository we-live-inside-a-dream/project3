import React from "react";
import StyledPage from "../../components/reusable/StyledPage";
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
