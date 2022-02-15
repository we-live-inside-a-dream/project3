import React, { useContext, useEffect, useState } from 'react'
import AuthenticationContext from "../../components/login/AuthenticationContext";




const EmployeeTimeOffViewPage = () => {
    const [timeOff, setTimeOff] = useState(null);
    const authContext = useContext(AuthenticationContext);
    const user = authContext.user;

    useEffect(() => {
        if (!user._Id) return
        const fetchTimeOff = async () => {
          console.log("userrrrr", user._Id)
          let fetchResult = await fetch(`/api/timeOff/listEmployee?id=${user._id}`);
          let fetchedTimeOff = await fetchResult.json();
          console.log("fetch time off", fetchedTimeOff)
          setTimeOff(fetchedTimeOff);
        };
        fetchTimeOff();
      }, [user._Id]);



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
    </div>
  )
}

export default EmployeeTimeOffViewPage
