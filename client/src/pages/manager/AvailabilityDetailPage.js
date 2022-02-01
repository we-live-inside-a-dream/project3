import React, { useEffect, useState } from "react";
import AvailabilityDetail from "../../components/employee-availabilities/AvailabilityDetail";
import StyledPage from "../../components/reusable/styled-page/StyledPage";
import { useParams } from "react-router-dom";

function AvailabilityDetailPage() {
  // // const [id, setId] = useState("");
  // let params = useParams();
  // let availabilityId = params.id;

  // // useEffect(() => {
  // //   setId(availabilityId);
  // // }, [availabilityId]);

  // console.log("the availability id is", availabilityId);

  return (
    <div>
      <StyledPage style={{ height: "92vh" }}>
        <AvailabilityDetail />
      </StyledPage>
    </div>
  );
}

export default AvailabilityDetailPage;
