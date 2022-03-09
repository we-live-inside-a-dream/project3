import React from "react";
import StyledPage from "../../components/reusable/styled-page/StyledPage";
import EmployeeProfileList from "../../components/employee-list/EmployeeProfileList";

function EmployeesListPage({ employeeProfileEdit }) {
  return (
    <div>
      <EmployeeProfileList employeeProfileEdit={employeeProfileEdit} />
    </div>
  );
}

export default EmployeesListPage;
