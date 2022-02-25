import React, { useState } from "react";
import StyledPage from "../../components/reusable/styled-page/StyledPage";
import StyledPageTitle from "../../components/reusable/styled-page/StyledPageTitle";
import PositionSettings from "../../components/management-settings/PositionSettings";

function ManagerSettingsPage() {
  const [positionsView, setPositionsView] = useState(false);

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
      </StyledPage>
    </div>
  );
}

export default ManagerSettingsPage;
