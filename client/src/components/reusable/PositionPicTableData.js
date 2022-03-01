import React from "react";
import StyledEditButton from "../reusable/Inputs/StyledEditButton";

function PositionPicTableData({
  //   existingValues,
  edit,
  onClick,

  position,
}) {
  return (
    <div
      style={{
        display: "grid",
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
            color: "white",
            fontSize: "2rem",
            textAlign: "center",
            border: "3px solid var(--nameIconBorder)",
          }}
        >
          {position[0] + position[1]}
          {edit && <StyledEditButton onClick={onClick}>✎</StyledEditButton>}
        </div>
      </div>

      <div
        style={{
          margin: "auto 10px auto 10px",
          color: "var(--accentColorTitle)",
          fontWeight: "600",
          display: "block",
          textAlign: "left",
        }}
      >
        <p>{`${position}`}</p>
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

export default PositionPicTableData;
