import React from "react";
import StyledEditButton from "../reusable/Inputs/StyledEditButton";

function NamePicTableData({
  //   existingValues,
  edit,
  onClick,
  firstName,
  lastName,
  setModalOpen,
  position,
  canEdit,
  imageUrl,
}) {
  console.log("THE IMAGE URL IS >>>>>>>>>>>>>>>>>>>>>>>>", imageUrl);
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
        {/* <div
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
            fontSize: "2rem",
            textAlign: "center",
            border: "3px solid var(--nameIconBorder)",
            position: "relative",
          }}
        >
          {firstName[0]}
        </div> */}
        <div
          style={{
            gridRow: "1",
            // backgroundImage: "url(" + imageUrl + ")",
            backgroundColor: " var(--nameIconBorder)",
            // height: "32px",
            // width: "32px",
            height: "2.8rem",
            width: "2.8rem",
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
            alt={firstName}

            // style={{ backgroundPosition: "center" }}
          />
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
        <p>{`${firstName} ${lastName.slice(0, 1)}`}</p>
        {canEdit === true && (
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
          {position}
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

export default NamePicTableData;
