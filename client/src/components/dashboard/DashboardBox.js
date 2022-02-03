import React from "react";
import StyledScaledComponent from "./StyledScaledContent";

let dashBoxStyle = {
  width: "30%",
  height: "0",
  paddingBottom: "30%",
  border: "2px solid lightGrey",
  // margin: "auto auto",
  borderRadius: "5%",
  overflow: "hidden",

  //   justifyContent: "spaceAround",
};

const DashboardBox = function ({ title, clickFunction, content }) {
  return (
    <div style={dashBoxStyle}>
      <div
        onClick={clickFunction}
        style={{
          background: "#e37222",
          alignSelf: "flex-start",
          // margin: "0px auto 0px auto",
          color: "white",
          textAlign: "center",
          border: "2px solid #e37222",
          cursor: "pointer",
        }}
      >
        <h3>{title}</h3>
      </div>
      <div>
        <div>{content}</div>
      </div>
    </div>
  );
};
export default DashboardBox;
