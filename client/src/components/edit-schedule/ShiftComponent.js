import React from "react";

const ShiftComponent = ({ props }) => {
  let employee = props.employee;
  let index = props.index;
  let setShiftId = props.setShiftId;
  let businessHours = props.businessHours;

  function convertTime(prop) {
    let timeString =
      prop.slice(0, 2) + (prop.slice(3) / 60).toString().slice(1);
    // console.log(timeString,"new String")
    return timeString;
  }

  return (
    <>
      <tr key={index} onClick={() => setShiftId(employee._id)}>
        <td key={index}>
          <div style={{ display: "inline-flex" }}>
            <div
              style={{
                backgroundColor: "grey",
                height: "3rem",
                width: "2rem",
                marginRight: "10px",
                alignSelf: "center",
              }}
            ></div>
            <div
              style={{
                margin: "auto 10px auto 10px",
                color: "var(--accentColorTitle)",
                fontWeight: "600",
                display: "block",
              }}
            >
              <p>{employee.name}</p>
              <p
                style={{
                  textShadow: "none",
                  color: "#545454",
                  fontSize: ".7rem",
                }}
              >
                {employee.start.slice(0, 2)}-{employee.end.slice(0, 2)}
              </p>
            </div>
          </div>
        </td>

        {businessHours?.map((hour, index) => {
          if (
            hour >= convertTime(employee.start) &&
            hour < convertTime(employee.end)
          ) {
            return (
              <td key={index}>
                <div
                  style={{
                    backgroundColor: "var(--scheduleTimeBar)",
                    height: "45px",
                    padding: "0px",
                    border: "1px solid #5AB9EA",
                    margin: "25px 0",
                  }}
                ></div>
              </td>
            );
          } else {
            return <td key={index}></td>;
          }
        })}
      </tr>
    </>
  );
};

export default ShiftComponent;
