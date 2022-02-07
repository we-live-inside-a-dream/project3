import { useState } from "react";
import StyledPage from "../../components/reusable/styled-page/StyledPage";
import StyledPageTitle from "../../components/reusable/styled-page/StyledPageTitle";
import EmployeesList from "./EmployeesListPage";
import CreateEmployeePage from "./CreateEmployeePage";
import StyledEmployeePageButtonGroup from "./StyledEmployeePageButtonGroup";
import EmployeeAvailabilityList from "../../components/employee-availabilities/EmployeeAvailabilityList";

function EmployeesMenuPage() {
  const [currentTab, setCurrentTab] = useState(1);
  return (
    <>
      <StyledPage>
        <StyledPageTitle
          style={{ gridTemplateRow: "1", justifyContent: "center" }}
        >
          EMPLOYEES PAGE{" "}
        </StyledPageTitle>
        <div style={{ margin: "auto", justifyContent: "center" }}>
          <StyledEmployeePageButtonGroup
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            style={{ marginLeft: "auto", marginRight: "auto" }}
          />
        </div>
        {currentTab === 1 && (
          <EmployeesList
            setCurrentTab={setCurrentTab}
            currentTab={currentTab}
          />
        )}
        {currentTab === 2 && (
          <CreateEmployeePage
            setCurrentTab={setCurrentTab}
            currentTab={currentTab}
          />
        )}
        {currentTab === 3 && (
          <EmployeeAvailabilityList
            setCurrentTab={setCurrentTab}
            currentTab={currentTab}
          />
        )}
      </StyledPage>
    </>
  );
}

export default EmployeesMenuPage;
