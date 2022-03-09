import { useState, useEffect } from "react";
import StyledPage from "../../components/reusable/styled-page/StyledPage";
import StyledPageTitle from "../../components/reusable/styled-page/StyledPageTitle";
import EmployeesList from "./EmployeesListPage";
import CreateEmployeePage from "./CreateEmployeePage";
import StyledEmployeePageButtonGroup from "./StyledEmployeePageButtonGroup";
import EmployeeAvailabilityList from "../../components/employee-availabilities/EmployeeAvailabilityList";
import { useManagerSettings } from "../../components/reusable/context/ManagerSettingsProvider";
import { flexbox } from "@mui/system";

function EmployeesMenuPage() {
  const [currentTab, setCurrentTab] = useState(1);
  const [perms, setPerms] = useState();
  const value = useManagerSettings();

  useEffect(() => {
    let allPermissions = value?.permissions;
    setPerms(allPermissions);
  }, [value?.permissions]);

  return (
    <>
      <StyledPage>
        <StyledPageTitle
          style={{ gridTemplateRow: "1", justifyContent: "center" }}
        >
          HUMAN RESOURCES
        </StyledPageTitle>
        <div style={{ margin: "auto", justifyContent: "center" }}>
          <div style={{ width: "100%", margin: "auto" }}>
            <StyledEmployeePageButtonGroup
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              style={{ margin: "40px auto", padding: "0px" }}
            />
          </div>
        </div>
        {currentTab === 1 && (
          <EmployeesList
            setCurrentTab={setCurrentTab}
            currentTab={currentTab}
            employeeProfileEdit={perms?.employeeProfileEdit}
          />
        )}
        {currentTab === 2 && (
          <div
            style={{
              margin: " 80px auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CreateEmployeePage
              setCurrentTab={setCurrentTab}
              currentTab={currentTab}
              employeeProfileEdit={perms?.employeeProfileEdit}
            />
          </div>
        )}
        {currentTab === 3 && (
          <EmployeeAvailabilityList
            setCurrentTab={setCurrentTab}
            currentTab={currentTab}
            employeeProfileEdit={perms?.employeeProfileEdit}
          />
        )}
      </StyledPage>
    </>
  );
}

export default EmployeesMenuPage;
