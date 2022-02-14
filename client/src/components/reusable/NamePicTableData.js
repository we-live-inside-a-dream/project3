import React from "react";
import StyledEditButton from "../reusable/Inputs/StyledEditButton";

function NamePicTableData({
  //   existingValues,
  edit,
  onClick,
  firstName,
  lastName,
}) {
  return (
    <td>
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
              border: "3px solid var(--nameIconBorder)",
            }}
          ></div>
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
          <p>
            {`${firstName} ${lastName.slice(0, 1)}`}

            {edit && <StyledEditButton onClick={onClick}>✎</StyledEditButton>}
          </p>
          <p
            style={{
              color: "#545454",
              fontSize: ".7rem",
            }}
          ></p>
        </div>
      </div>
    </td>
  );
}

export default NamePicTableData;
