import React, { useState } from "react";
import StyledPage from "../../components/reusable/styled-page/StyledPage";
import StyledPageTitle from "../../components/reusable/styled-page/StyledPageTitle";
import PositionSettings from "../../components/management-settings/PositionSettings";
import BusinessDaysForm from "../../components/management-settings/BusinessDaysForm";

function ManagerSettingsPage() {
  const [positionsView, setPositionsView] = useState(false);
  const [daysHoursView, setDaysHoursView] = useState(false);
  const [permissionsView, setPermissionsView] = useState(false);

  return (
    <div>
      <StyledPage>
        <StyledPageTitle style={{ marginBottom: "40px" }}>
          Manager Settings
        </StyledPageTitle>
        <h3
          style={{ color: "var(--accentColorTitle)", cursor: "pointer" }}
          onClick={() => setPositionsView(!positionsView)}
        >
          Position Settings {positionsView === false ? "▾" : "▴"}
        </h3>
        {positionsView === true && <PositionSettings />}
        <h3
          style={{ color: "var(--accentColorTitle)", cursor: "pointer" }}
          onClick={() => setDaysHoursView(!daysHoursView)}
        >
          Business Days & Times Settings {daysHoursView === false ? "▾" : "▴"}
        </h3>
        {daysHoursView === true && (
          <BusinessDaysForm />
        )}
        <h3
          style={{ color: "var(--accentColorTitle)", cursor: "pointer" }}
          onClick={() => setPermissionsView(!permissionsView)}
        >
          Employee Permissions Settings {permissionsView === false ? "▾" : "▴"}
        </h3>
        {permissionsView === true && (
          <h3>HERE IS WHERE SOME CONTENT WILL BE!!!</h3>
        )}
      </StyledPage>
    </div>
  );
}

export default ManagerSettingsPage;
