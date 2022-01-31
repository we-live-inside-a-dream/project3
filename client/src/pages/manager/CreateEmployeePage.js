import EmployeeAvailabilityForm from "../../components/employee-availabilities/EmployeeAvailabilityForm";
import EmployeeEditForm from "../../components/employee-list/EmployeeEditForm";
import StyledPage from "../../components/reusable/styled-page/StyledPage";
import { useState } from "react";

const CreateEmployeePage = () => {
  const [createdEmployeeId, setCreatedEmployeeId] = useState("");
  const [currentTab, setCurrentTab] = useState(1);
  // let navigate = useNavigate();
  // async function createEmployee(newEmployee) {
  //     // const newEmployee = {firstName: "", lastName: ""}
  //     await fetch("/api/employeeProfile/create", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(newEmployee),
  //       // body: newEmployee
  //     });
  //     navigate("/employeeList");
  //   }
  return (
    <StyledPage>
      {currentTab === 1 && (
        <EmployeeEditForm
          setId={setCreatedEmployeeId}
          setCurrentTab={setCurrentTab}
        />
      )}
      {currentTab === 2 && (
        <EmployeeAvailabilityForm
          setCurrentTab={setCurrentTab}
          id={createdEmployeeId}
        />
      )}
    </StyledPage>
  );
};

export default CreateEmployeePage;
