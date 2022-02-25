import React, { useContext, useEffect, useState } from "react";
import AuthenticationContext from "../../login/AuthenticationContext";

const ManagerSettingsContext = React.createContext();

export function useManagerSettings() {
  return useContext(ManagerSettingsContext);
}

export function ManagerSettingsProvider({ childern }) {
  //ADD CONTENT BELOW

  const [positions, setPositions] = useState("THE REZZA");

  let value = { positions };

  return (
    <ManagerSettingsContext.Provider value={value}>
      {childern}
    </ManagerSettingsContext.Provider>
  );
}

//***ADD THIS TO PAGE TO CALL CONTEXT ***/
// import { useManagerSettings } from "../../components/reusable/context/ManagerSettingsProvider";
// const value = useManagerSettings();
// const positions = value.positions;
