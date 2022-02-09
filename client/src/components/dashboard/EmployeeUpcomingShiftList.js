import React, { useContext, useEffect, useState } from "react";
import AuthenticationContext from "../login/AuthenticationContext";
import moment from "moment";

function EmployeeUpcomingShiftList() {
  const [shifts, setShifts] = useState([]);
  const authContext = useContext(AuthenticationContext);
  let user = authContext.user;
  let id = user?._id;
  console.log(id);

  let today = moment().format("yyyy-MM-DD");

  useEffect(() => {
    const getUpcomingShiftsById = async function () {
      let employeeLst = await fetch(
        process.env.REACT_APP_ELECTRON_SERVER +
          `/api/schedule/employee-id?id=${id}&today=${today}`
      );
      let nameIdList = await employeeLst.json();
      setShifts(nameIdList);
    };
    getUpcomingShiftsById();
  }, [id, today]);

  // console.log("today is ", today);

  const formatTime = function (time) {
    let newTime = moment(time, "hh:mm").format("h:mma");
    return newTime;
  };
  const formatDate = function (date) {
    let newDate = moment(date).format("ddd, MMM, Do");
    return newDate;
  };

  return (
    <div>
      {shifts?.map((shift, index) => {
        return (
          <div
            key={index}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              width: "260px",
              fontSize: "medium",
              backgroundColor: "white",
              color: "black",
            }}
          >
            <p
              style={{
                gridRow: "1",
                lineHeight: "1",
                margin: "4px",
                fontSize: "medium",
              }}
            >
              {formatDate(shift.date)}
            </p>
            <p
              style={{
                gridRow: "1",
                lineHeight: "1",
                margin: "4px",
                fontSize: "medium",
              }}
            >{`${formatTime(shift.start)}-${formatTime(shift.end)}`}</p>
          </div>
        );
      })}
    </div>
  );
}

export default EmployeeUpcomingShiftList;
