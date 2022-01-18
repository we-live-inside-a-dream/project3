import React from "react";
import StyledPage from "../StyledComponents/StyledPage";
import EmployeeProfileList from "../StyledComponents/tables/EmployeeProfileList";

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
