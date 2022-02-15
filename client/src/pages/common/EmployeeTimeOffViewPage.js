import React, { useContext, useEffect, useState } from "react";
import EmployeeTimeOff from "../../components/employee-time-off/EmployeeTimeOff";
import AuthenticationContext from "../../components/login/AuthenticationContext";

const EmployeeTimeOffViewPage = () => {
  const [timeOff, setTimeOff] = useState(null);
  //   const [startTime, setStartTime] = useState(null);
  //   const [endTime, setEndTime] = useState(null);
  //   const [startDate, setStartDate] = useState(null);
  //   const [endDate, setEndDate] = useState(null);
  //   const [type, setType] = useState(null);
  //   const [comment, setComment] = useState("");
  //   const [allDay, setAllDay] = useState(true);
  //   const [modalConfirmIsOpen, setModalConfirmIsOpen] = useState(false);
  //   const [dateMessageVal, setDateMessageVal] = useState(null);
  //   const [timeMessageVal, setTimeMessageVal] = useState(null);
  //   const [shown, setShown] = useState(false);
  const authContext = useContext(AuthenticationContext);
  const user = authContext.user;

  console.log(user);

  useEffect(() => {
    // if (!user._Id) return;
    const fetchTimeOff = async () => {
      console.log("userrrrr", user._Id);
      let fetchResult = await fetch(`/api/timeOff/listEmployee?id=${user._id}`);
      let fetchedTimeOff = await fetchResult.json();
      console.log("fetch time off", fetchedTimeOff);
      setTimeOff(fetchedTimeOff);
    };
    fetchTimeOff();
  }, [user._id]);

  async function updateTimeOff(updatedTimeOff) {
      console.log(
          "posting to user Id", user._id, "with Data", updatedTimeOff
      );
      await fetch(`/api/timeOff/update?id=${user._id}`, {
          method: 'POST',
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTimeOff)
      })
  }

  return (
    <div>
      {timeOff?.map((t) => {
        return (
          <div
            key={t._id}
            value={t}
            // onClick={() => {
            //   setModalConfirmIsOpen(true);
            //   setTimeOffValues(t);
            //   console.log(t);
            // }}
            style={{
              padding: "10px",
              textAlign: "center",
              height: "auto",
            }}
          >
            {`${t.firstName} ${t.lastName[0]}, ${t.status}`}
          </div>
        );
      })}
      <EmployeeTimeOff existingValues={timeOff} onSave={updateTimeOff}/>
    </div>
  );
};

export default EmployeeTimeOffViewPage;
