import { typography } from "@mui/system";
import React, { useEffect, useState } from "react";

function ManagerViewOfShiftSwapRequests() {
  const [swapRequests, setSwapRequests] = useState([]);

  useEffect(() => {
    async function findShiftSwapRequests() {
      let fetchedResult = await fetch(
        "/api/schedule/find-pending-swap-requests"
      );
      let retreivedSwapRequests = await fetchedResult.json();
      setSwapRequests(retreivedSwapRequests);
    }
    findShiftSwapRequests();
  }, []);
  console.log(typeof swapRequests);

  return (
    <div>
      THESE ARE REQUESTA
      {swapRequests?.map((request) => {
        return <p>{request.firstName}</p>;
      })}
    </div>
  );
}

export default ManagerViewOfShiftSwapRequests;
