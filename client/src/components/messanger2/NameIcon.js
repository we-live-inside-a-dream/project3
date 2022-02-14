import React from "react";
import StyledEditButton from "../reusable/Inputs/StyledEditButton";

function NameIcon({ name }) {
  return (
    <div
      style={{
        display: "grid",
        height: "4em",
        width: "12rem",
        gridTemplateColumns: "5% 25% 70%",
      }}
    >
      <div style={{ gridRow: "1" }}></div>
      <div>
        <div
          style={{
            gridRow: "1",
            backgroundColor: "grey",
            height: "2.5rem",
            width: "2.5rem",
            margin: "auto",
            alignSelf: "center",
            borderRadius: "50%",
            border: "3px solid var(--nameIconBorder)",
          }}
        ></div>
      </div>

      <div
        style={{
          margin: "auto 10px auto 10px",
          color: "#4488AB",
          fontWeight: "600",
          display: "block",
          textAlign: "left",
        }}
      >
        <p>{name}</p>
        <p
          style={{
            color: "#545454",
            fontSize: ".7rem",
          }}
        ></p>
      </div>
    </div>
  );
}

export default NameIcon;
