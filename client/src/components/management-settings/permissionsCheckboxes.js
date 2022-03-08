import { useState, useEffect } from "react";
import { InputLabel } from "@mui/material";

function PermissionsCheckboxes({
  permissionSetter,
  permissionValue,
  postData,
}) {
  const [employee, setEmployee] = useState(false);
  const [supervisor, setSupervisor] = useState(false);
  const [manager, setManager] = useState(false);
  const [administrator, setAdministrator] = useState(true);

  let permissions = [
    employee === true ? "employee" : null,
    supervisor === true ? "supervisor" : null,
    manager === true ? "manager" : null,
    "administrator",
  ];
  useEffect(() => {
    if (permissionValue) {
      permissionValue.includes("employee") && setEmployee(true);
      permissionValue.includes("supervisor") && setSupervisor(true);
      permissionValue.includes("manager") && setManager(true);
      setAdministrator(true);
    }
  }, [permissionValue]);

  function setPermission() {
    // permissionSetter([...permissions]);
    let permissionArray = [...permissions];
    let filteredPermissionArray = permissionArray.filter(
      (permission) => permission !== null
    );
    permissionSetter([...filteredPermissionArray]);
  }
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
            setPermission();
            postData();
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
            onInputChange(e.target.checked, setSupervisor);
            setPermission();
            postData();
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
            setPermission();
            postData();
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
            setPermission();
            postData();
          }}
        ></input>
        Administrator
      </InputLabel>
    </div>
  );
}
export default PermissionsCheckboxes;
