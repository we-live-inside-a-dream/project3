import React from "react";
import StyledEditButton from "../reusable/Inputs/StyledEditButton";

function NameIcon({ name, imageUrl }) {
  return (
    <div
      style={{
        display: "grid",
        height: "4em",
        minWidth: "10rem",
        // width: "7rem",
        gridTemplateColumns: "5% 25% 70%",
      }}
    >
      <div style={{ gridRow: "1" }}></div>
      <div>
        <div
          style={{
            // gridRow: "1",
            // backgroundImage: "url(" + imageUrl + ")",
            backgroundColor: " var(--nameIconBorder)",
            // height: "32px",
            // width: "32px",
            height: "2.4rem",
            width: "2.4rem",
            margin: "auto",
            marginTop: "8px",
            overflow: "hidden",
            borderRadius: "50%",
            border: "3px solid var(--nameIconBorder)",
            position: "relative",
            display: "flex",
          }}
        >
          <img
            src={"/images/" + imageUrl}
            alt={name}
            style={{ border: "none" }}

            // style={{ backgroundPosition: "center" }}
          />
        </div>
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
        <p>{`  ${name}`}</p>
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
