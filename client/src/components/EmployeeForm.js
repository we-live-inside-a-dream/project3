import { useState } from "react";
import EmployeeDetail from "./EmployeeDetail";
import EmployeeEditForm from "./EmployeeEditForm";
import EmployeeList from "./EmployeeList";

function EmployeeForm() {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState();

  async function createEmployee({ newEmployee }) {
    await fetch("/api/employeeProfile/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployee),
    });
  }
  return (
    <div>
      {!selectedEmployeeId && (
        <div>
          <EmployeeList setSelectedEmployeeId={setSelectedEmployeeId} />
          <EmployeeEditForm onSave={createEmployee} />
        </div>
      )}
      {selectedEmployeeId && (
        <div>
          <button onClick={() => setSelectedEmployeeId(undefined)}>
            {" "}
            Go Back
          </button>
          <EmployeeDetail employeeId={selectedEmployeeId} />{" "}
        </div>
      )}
    </div>
  );
}

export default EmployeeForm;
