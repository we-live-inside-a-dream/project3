import React from "react";
import StyledPage from "../../components/reusable/StyledPage";
import EmployeeProfileList from "../../components/employee-list/EmployeeProfileList";

function EmployeesList() {
  console.log("%cHowdyFolks", "color:blue; font-size: 30px;");
  return (
    <div>
      <StyledPage>
        <EmployeeProfileList />
      </StyledPage>
    </div>
  );
}

export default EmployeesList;
