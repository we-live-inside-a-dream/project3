import React, { useEffect, useState } from "react";
import AvailabilityDetail from "../../components/employee-availabilities/AvailabilityDetail";
import StyledPage from "../../components/reusable/styled-page/StyledPage";
import { useParams } from "react-router-dom";
import { useManagerSettings } from "../../components/reusable/context/ManagerSettingsProvider";

function AvailabilityDetailPage() {
  const [perms, setPerms] = useState();
  const value = useManagerSettings();
  useEffect(() => {
    if (value) {
      setPerms(value.employeeProfileEdit);
    }
    console.log("FROM THE EMPLOYEE DETAIL PAGE", perms);
  }, [perms, value]);

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
        <AvailabilityDetail employeeProfileEdit={perms} />
      </StyledPage>
    </div>
  );
}

export default AvailabilityDetailPage;
