import { useState, useEffect, useContext } from "react";
import EmployeeAvailabilityList from "../../components/employee-availabilities/EmployeeAvailabilityList";
import StyledPage from "../../components/reusable/styled-page/StyledPage";
import { useManagerSettings } from "../../components/reusable/context/ManagerSettingsProvider";

function EmployeeAvailabilityPage() {
  const [perms, setPerms] = useState();
  const value = useManagerSettings();
  useEffect(() => {
    if (value) {
      setPerms(value.employeeProfileEdit);
    }
  }, [value]);

  // const user = authContext.user;
  return (
    <StyledPage>
      <EmployeeAvailabilityList
        employeeProfileEdit={value.employeeProfileEdit}
      />
    </StyledPage>
  );
}

export default EmployeeAvailabilityPage;
