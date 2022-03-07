import React from "react";

function WeekScheduleLegend() {
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
          backgroundColor: "#FC4445",
          lineHeight: ".5",
          display: "inline-block",
          margin: " auto 8px",
          gridRow: "1",
          justifyContent: "left",
        }}
      ></div>
      <p style={{ padding: "0px", margin: "0px", gridRow: "1" }}>Unavailable</p>

      <div
        style={{
          borderRadius: "50%",
          height: "10px",
          width: "10px",
          backgroundColor: "gold",
          lineHeight: ".5",
          display: "inline-block",
          margin: " auto 8px",
          gridRow: "2",
          justifyContent: "left",
        }}
      ></div>
      <p style={{ padding: "0px", margin: "0px", gridRow: "2" }}>
        Available part-day
      </p>

      <div
        style={{
          borderRadius: "50%",
          height: "10px",
          width: "10px",
          backgroundColor: "#32cd32",
          lineHeight: ".5",
          display: "inline-block",
          margin: " auto 8px",
          gridRow: "3",
          justifyContent: "left",
        }}
      ></div>
      <p style={{ padding: "0px", margin: "0px", gridRow: "3" }}>
        Available all day
      </p>
    </div>
  );
}

export default WeekScheduleLegend;
