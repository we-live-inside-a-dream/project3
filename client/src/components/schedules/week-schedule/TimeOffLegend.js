import React from "react";

function TimeOffLegend() {
  return (
    <div
      style={{
        display: "grid",
        alignContent: "baseline",
        gridTemplateColumns: "1fr 6fr",
      }}
    >
      <div
        style={{
          borderRadius: "50%",
          height: "10px",
          width: "10px",
          backgroundColor: "black",
          lineHeight: ".5",
          display: "inline-block",
          margin: " 0px 8px",
          gridRow: "1",
          justifyContent: "left",
        }}
      ></div>
      <p style={{ padding: "0px", margin: "0px", gridRow: "1" }}>
        Booked off full-day
      </p>

      <div
        style={{
          borderRadius: "50%",
          height: "6px",
          width: "6px",
          border: "2px solid black",
          lineHeight: ".5",
          display: "inline-block",
          margin: " 0px 8px",
          gridRow: "2",
          justifyContent: "left",
        }}
      ></div>
      <p style={{ padding: "0px", margin: "0px", gridRow: "2" }}>
        Booked off part-day
      </p>
    </div>
  );
}

export default TimeOffLegend;
