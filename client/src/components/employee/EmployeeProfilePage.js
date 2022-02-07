import React, { useContext, useEffect, useState } from "react";
import AuthenticationContext from "../../components/login/AuthenticationContext";
import moment from "moment";

function EmployeeProfilePage() {
  const [shifts, setShifts] = useState([]);
  const authContext = useContext(AuthenticationContext);
  let user = authContext.user;
  let id = user?._id;
  console.log(id);

  useEffect(() => {
    const getUpcomingShiftsById = async function () {
      let employeeLst = await fetch(`/api/schedule/employee-id?id=${id}`);
      let nameIdList = await employeeLst.json();
      setShifts(nameIdList);
    };
    getUpcomingShiftsById();
  }, [id]);

  const formatTime = function (time) {
    let newTime = moment(time, "hh:mm").format("h:mm a");
    return newTime;
  };

  return (
    <div>
      {shifts?.map((shift, index) => {
        return (
          <p key={index}>
            {`${moment(shift.date).format("ddd, MMM, Do")} ${formatTime(
              shift.start
            )}-${formatTime(shift.end)}`}
          </p>
        );
      })}
    </div>
  );
}

export default EmployeeProfilePage;
