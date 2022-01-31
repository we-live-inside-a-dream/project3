import React from "react";
import AvailabilityDetail from "../../components/employee-availabilities/AvailabilityDetail";
import StyledPage from "../../components/reusable/styled-page/StyledPage";

function AvailabilityDetailPage() {
  return (
    <div>
      <StyledPage style={{ height: "92vh" }}>
        <AvailabilityDetail />
      </StyledPage>
    </div>
  );
}

export default AvailabilityDetailPage;
