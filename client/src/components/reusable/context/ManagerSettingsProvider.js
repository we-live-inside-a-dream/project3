import React, { useContext, useEffect, useState } from "react";
import AuthenticationContext from "../../login/AuthenticationContext";

const ManagerSettingsContext = React.createContext();

export function useManagerSettings() {
  return useContext(ManagerSettingsContext);
}

export function ManagerSettingsProvider({ children }) {
  //ADD CONTENT BELOW
  const [render, setRender] = useState(false);
  const [positions, setPositions] = useState();
  const [breaks, setBreaks] = useState();
  const [businessHours, setBusinessHours] = useState();
  const [permissions, setPermissions] = useState();
  const [userPermissionLevel, setUserPermissionLevel] = useState();

  const authContext = useContext(AuthenticationContext);
  let user = authContext.user;

  useEffect(() => {
    if (user?._id) {
      async function getPositionList() {
        let fetchedResult = await fetch("/api/positions/get-all");
        let fetchedPositions = await fetchedResult.json();
        setPositions(fetchedPositions);
      }
      getPositionList();
    }
  }, [user?._id, render]);
  console.log("from the managerSettingsProvider, positions are", positions);

  function reload() {
    setRender((prevCheck) => !prevCheck);
  }

  useEffect(() => {
    if (user?.permissions) {
      setUserPermissionLevel(user?.permissions[0]);

      async function getUserPermissions() {
        let fetchedResult = await fetch(
          `/api/permissions/get-by-user-permissions?permissions=${userPermissionLevel}`
        );
        let fetchedPermissions = await fetchedResult.json();
        setPermissions(fetchedPermissions);
      }
      getUserPermissions();
    }
  }, [user, userPermissionLevel]);
  console.log(
    "FROM THE MAAGER SETTINGS, THESE ARE THE PERMISSIONS!!!!!!!",
    permissions
  );
  let value = { positions, breaks, businessHours };

  return (
    <ManagerSettingsContext.Provider value={value}>
      {children}
    </ManagerSettingsContext.Provider>
  );
}

//***ADD THIS TO PAGE TO CALL CONTEXT ***/
// import { useManagerSettings } from "../../components/reusable/context/ManagerSettingsProvider";
// const value = useManagerSettings();
// const positions = value.positions;
