import React, { useContext, useEffect, useState } from "react";
import AuthenticationContext from "../../components/login/AuthenticationContext";
import StyledScaledComponent from "./StyledScaledContent";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import ApprovalSymbol from "./ApprovalSymbol";

let dashBoxStyle = {
  width: "30%",
  height: "0",
  paddingBottom: "26%",
  border: "2px solid lightGrey",
  margin: "auto auto",
  borderRadius: "3%",
  overflow: "hidden",
  background: "var(--dashGridBoxBackground)",

  //   justifyContent: "spaceAround",
};

// function statusColor(time) {
//   if (time.status === "pending") {
//     return "orange";
//   } else if (time.status === "approved") {
//     return "green";
//   } else return "red";
// }

const TimeOffBox = function ({ onClick }) {
  const [timeOff, setTimeOff] = useState(null);
  const authContext = useContext(AuthenticationContext);
  const user = authContext.user;

  console.log(user);

  useEffect(() => {
    // if (!user._Id) return;
    const fetchTimeOff = async () => {
      console.log("userrrrr", user._id);
      let fetchResult = await fetch(`/api/timeOff/listEmployee?id=${user._id}`);
      let fetchedTimeOff = await fetchResult.json();
      console.log("fetch time off", fetchedTimeOff);
      setTimeOff(fetchedTimeOff);
    };
    fetchTimeOff();
  }, [user._id]);
  console.log(timeOff, "***********TIME OFF FOR ", user.firstName);
  let navigate = useNavigate();
  return (
    <div style={dashBoxStyle} onClick={onClick}>
      <div
        style={{
          background: "var(--mainHeader)",
          alignSelf: "flex-start",
          // margin: "0px auto 0px auto",
          color: "var(--headerWhiteFont)",
          textAlign: "center",
          border: "2px solid var(--mainHeader)",
          cursor: "pointer",
        }}
      >
        <h3>TIME OFF</h3>
      </div>
      <div style={{ position: "relative", padding: " 5px 15px" }}>
        {/* <StyledScaledComponent
        //   padding={padding}
        //   top={top}
        //   left={left}
        //   transformOrigin={transformOrigin}
        //   transform={transform}
        > */}
        {timeOff?.map((time, index) => {
          return (
            <div key={index}>
              <p
                style={{
                  margin: "5px",
                  display: "flex",
                  color: "var(--accentColorTitle)",
                }}
              >
                {`${time.type}:`}
                <ApprovalSymbol time={time} style={{ display: "flex" }} />
              </p>
              <p style={{ margin: "5px" }}>{`${moment(time.startDate).format(
                "MMM Do, yyyy"
              )} - ${moment(time.endDate).format("MMM Do, yyyy")}`}</p>
            </div>
          );
        })}
        {/* </StyledScaledComponent> */}
      </div>
    </div>
  );
};
export default TimeOffBox;
