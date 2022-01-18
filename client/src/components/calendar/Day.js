import React from "react";

function Day({ day }) {
  return (
    <div
      style={{
        height: "6.5rem",
        width: "11rem",
        border: "1px solid lightgrey",
      }}
    >
      <p style={{ color: "red" }}>{day}</p>
    </div>
  );
}

export default Day;
