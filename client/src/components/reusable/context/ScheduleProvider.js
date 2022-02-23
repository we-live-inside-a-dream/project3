import React, { useContext, useEffect, useState } from "react";
import AuthenticationContext from "../../login/AuthenticationContext";

const ScheduleContext = React.createContext();

export function useSchedule() {
  return useContext(ScheduleContext);
}

export function ScheduleProvider({ childern }) {
  const value = { createShift, updateShift };
  return (
    <ScheduleContext.provider value={value}>
      {childern}
    </ScheduleContext.provider>
  );
}
