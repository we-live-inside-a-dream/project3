import { useState, useEffect } from "react";
import { InputLabel } from "@mui/material";

function calculatePermissionSettings(employee, supervisor, manager) {
  const permissions = ["administrator"];
  if (employee) permissions.push("employee");
  if (supervisor) permissions.push("supervisor");
  if (manager) permissions.push("manager");
  return permissions;
}

function PermissionsCheckboxes({
  permissionSetter,
  permissionValue,
  postData,
}) {
  const [employee, setEmployee] = useState(false);
  const [supervisor, setSupervisor] = useState(false);
  const [manager, setManager] = useState(false);
  const [administrator, setAdministrator] = useState(true);
  const [permissions, setPermissions] = useState(
    calculatePermissionSettings(employee, supervisor, manager)
  );

  useEffect(() => {
    if (permissionValue) {
      permissionValue.includes("employee") && setEmployee(true);
      permissionValue.includes("supervisor") && setSupervisor(true);
      permissionValue.includes("manager") && setManager(true);
      setAdministrator(true);
    }
  }, [permissionValue]);

  function updatePermission() {
    let permissionArray = calculatePermissionSettings(
      employee,
      supervisor,
      manager
    );
    setPermissions(permissionArray);
    permissionSetter(permissionArray);
  }

  useEffect(updatePermission, [employee, supervisor, manager]);

  function onInputChange(value, setter) {
    setter(value);
  }

  return (
    <div style={{ display: "flex" }}>
      <InputLabel style={{ margin: "0px 10px" }}>
        <input
          type="checkbox"
          value={employee}
          checked={employee === true}
          onChange={(e) => {
            onInputChange(e.target.checked, setEmployee);
          }}
        ></input>
        Employee
      </InputLabel>

      <InputLabel style={{ margin: "0px 10px" }}>
        <input
          type="checkbox"
          value={supervisor}
          checked={supervisor === true}
          onChange={(e) => {
            console.log("%%%%", e.target.checked);
            onInputChange(e.target.checked, setSupervisor);
          }}
        ></input>
        Supervisor
      </InputLabel>

      <InputLabel style={{ margin: "0px 10px" }}>
        <input
          type="checkbox"
          value={manager}
          checked={manager === true}
          onChange={(e) => {
            onInputChange(e.target.checked, setManager);
          }}
        ></input>
        Manager
      </InputLabel>
      <InputLabel style={{ margin: "0px 10px" }}>
        <input
          type="checkbox"
          value={administrator}
          checked={administrator === true}
          onChange={(e) => {
            onInputChange(e.target.checked, setAdministrator);
          }}
        ></input>
        Administrator
      </InputLabel>
    </div>
  );
}
export default PermissionsCheckboxes;
