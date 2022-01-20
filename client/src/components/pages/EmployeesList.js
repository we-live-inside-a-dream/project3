import React from "react";
import StyledPage from "../StyledComponents/StyledPage";
import EmployeeProfileList from "../StyledComponents/tables/EmployeeProfileList";

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
