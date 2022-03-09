import { be } from "date-fns/locale";
import React from "react";
import StyledEditButton from "../reusable/Inputs/StyledEditButton";

// function PositionPicTableData({
//   //   existingValues,
//   edit,
//   onClick,
//   name,
//   position,
// }) {
//   return (
//     <div
//       style={{
//         display: "grid",
//         width: "12rem",
//         gridTemplateColumns: "5% 25% 70%",
//       }}
//     >
//       <div style={{ gridRow: "1" }}></div>
//       <div>
//         <div
//           style={{
//             gridRow: "1",
//             backgroundColor: "grey",
//             height: "2.5rem",
//             width: "2.5rem",
//             margin: "auto",
//             marginTop: "10px",
//             alignSelf: "center",
//             borderRadius: "50%",
//             color: "white",
//             fontSize: "2rem",
//             textAlign: "center",
//             border: "3px solid var(--nameIconBorder)",
//           }}
//         >
//           {position[0] + position[1]}

//           {/* {edit && (
//             <StyledEditButton
//               style={{ fontSize: "1rem", gridRow: "1" }}
//               onClick={onClick}
//             >
//               ✎
//             </StyledEditButton>
//           )}  */}
//         </div>
//       </div>
//       <div>
//         <div
//           style={{
//             margin: "3px 3px 5px 0px",
//             color: "var(--accentColorTitle)",
//             fontWeight: "600",
//             textAlign: "left",
//             display: "grid",
//             gridTemplateColumns: "1",
//             // display: "flex",
//           }}
//         >
//           <p>{`${position}`}</p>

//           {edit && (
//             <StyledEditButton
//               onClick={onClick}
//               style={{ fontSize: "1rem", gridRow: "1" }}
//             >
//               ✎
//             </StyledEditButton>
//           )}
//         </div>
//         <p
//           style={{
//             color: "#545454",
//             fontSize: "1 rem",
//             fontWeight: "500",
//             gridRow: "2",
//             gridColumn: "3",
//             marginTop: "0px",
//             textAlign: "left",
//           }}
//         >
//           {name}
//         </p>
//       </div>
//     </div>
//   );
// }

function PositionPicTableData({
  //   existingValues,
  edit,
  onClick,
  firstName,
  lastName,
  position,
}) {
  return (
    <div
      style={{
        display: "grid",
        width: "13rem",
        gridTemplateColumns: "5% 25% 70%",
      }}
    >
      <div style={{ position: "relative", gridRow: "1" }}></div>
      <div>
        <div
          style={{
            gridRow: "1",
            backgroundColor: "grey",
            height: "2.5rem",
            width: "2.5rem",
            margin: "auto",
            marginTop: "8px",
            alignSelf: "center",
            borderRadius: "50%",
            color: "white",
            fontSize: "2.2rem",
            textAlign: "center",
            border: "3px solid var(--nameIconBorder)",
            position: "relative",
          }}
        >
          {position[0] + position[1]}
        </div>
      </div>

      <div
        style={{
          margin: "auto 10px auto 10px",
          color: "var(--accentColorTitle)",
          fontWeight: "600",
          display: "block",
          textAlign: "left",
          position: "relative",
        }}
      >
        <p>{`${position?.charAt(0).toUpperCase() + position?.slice(1)}`}</p>
        {edit && (
          <StyledEditButton
            style={{ position: "absolute", top: "0", right: "0" }}
            fontSize={"1em"}
            margin={0}
            padding={0}
            onClick={onClick}
          >
            ✎
          </StyledEditButton>
        )}
        <div
          style={{
            margin: "0",
            color: "black",
            fontWeight: "100",
            position: "absolute",
            bottom: "0",
          }}
        >
          {lastName ? `${firstName} ${lastName[0]}` : null}
        </div>
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
