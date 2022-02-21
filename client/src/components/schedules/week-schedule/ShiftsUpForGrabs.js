import React, { useEffect, useState, useContext } from "react";
import AuthenticationContext from "../../login/AuthenticationContext";

function ShiftsUpForGrabs() {
  const [availableShifts, setAvailableShifts] = useState();
  const authContext = useContext(AuthenticationContext);
  let user = authContext.user;

  useEffect(() => {
    async function fetchAvailableShifts() {
      let shiftList = await fetch(
        `/api/schedule/shifts-up-for-grabs?userId=${user?._id}`
      );
      let fetchedShiftList = await shiftList.json();
      setAvailableShifts(fetchedShiftList);
    }

    fetchAvailableShifts();
  }, [user?._id]);

  return (
    <div>
      {availableShifts?.map((shifty, index) => {
        return <p key={index}>{shifty.firstName}</p>;
      })}
    </div>
  );
}

export default ShiftsUpForGrabs;
