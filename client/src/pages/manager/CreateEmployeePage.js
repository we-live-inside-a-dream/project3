import EmployeeAvailabilityForm from "../../components/employee-availabilities/EmployeeAvailabilityForm";
import EmployeeEditForm from "../../components/employee-list/EmployeeEditForm";
// import StyledPage from "../../components/reusable/styled-page/StyledPage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateEmployeePage = () => {
  const [createdEmployeeId, setCreatedEmployeeId] = useState("");
  const [currentCreateTab, setCurrentCreatetTab] = useState(10);

  let navigate = useNavigate();
  // async function createEmployee() {
  //   const newEmployee = { firstName: "", lastName: "" };
  //   await fetch("/api/employeeProfile/create", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newEmployee),
  //     // body: newEmployee
  //   });
  //   navigate("/employeeList");
  // }

  console.log(
    "THIS IS THE ID THAT IS BEING PASSED TO THE AVAILABILITY FORM",
    createdEmployeeId
  );
  return (
    <>
      {currentCreateTab === 10 && (
        <EmployeeEditForm
          setId={setCreatedEmployeeId}
          setCurrentCreateTab={setCurrentCreatetTab}
        />
      )}
      {currentCreateTab === 12 && (
        <EmployeeAvailabilityForm
          // setCurrentCreateTab={setCurrentCreatetTab}
          theId={createdEmployeeId}
          create="create"
        />
      )}
    </>
  );
};

export default CreateEmployeePage;
