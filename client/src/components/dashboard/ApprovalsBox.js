import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardBoxScale from "./DashboardBoxScale";
// import EmployeeUpcomingShiftList from "./EmployeeUpcomingShiftList";

function ScheduleContent() {
  const [swapsPending, setSwapsPending] = useState(false);
  const [timeOffPending, setTimeOffPending] = useState(false);

  useEffect(() => {
    async function findShiftSwapRequests() {
      let fetchedResult = await fetch(
        "/api/schedule/find-pending-swap-requests"
      );
      let retreivedSwapRequests = await fetchedResult.json();
      if (retreivedSwapRequests?.length > 0) {
        setSwapsPending(true);
      } else setSwapsPending(false);
    }
    findShiftSwapRequests();
  }, []);

  useEffect(() => {
    async function fetchTimeOff() {
      let fetchResult = await fetch("/api/timeOff/list");
      let fetchedTimeOff = await fetchResult.json();
      if (fetchedTimeOff?.length > 0) {
        setTimeOffPending(true);
      } else setTimeOffPending(false);
    }
    fetchTimeOff();
  }, []);

  return (
    <div>
      <h3 style={{ color: "var(--accentColorTitle)", margin: "0px auto" }}>
        SHIFT SWAP REQUESTS: {swapsPending === true ? "⏳" : "✅"}
      </h3>
      {swapsPending === true ? (
        <p>you have pending shift swap requests </p>
      ) : (
        <p>you are up to date with shift swap requests </p>
      )}
      <h3 style={{ color: "var(--accentColorTitle)", margin: "0px auto" }}>
        TIME OFF REQUESTS: {timeOffPending === true ? "⏳" : "✅"}
      </h3>
      {timeOffPending === true ? (
        <p>you have pending time off requests </p>
      ) : (
        <p>you are up to date with time off requests </p>
      )}
    </div>
  );
}
function ScheduleBox() {
  let navigate = useNavigate();

  return (
    <>
      <DashboardBoxScale
        padding="20px"
        top={0}
        left={0}
        transform={"Scale(1)"}
        transformOrigin={"top left"}
        title="MANAGER APPROVALS"
        clickFunction={() => navigate("/managerApprovalsPage")}
        content={<ScheduleContent />}
      />
    </>
  );
}

export default ScheduleBox;
