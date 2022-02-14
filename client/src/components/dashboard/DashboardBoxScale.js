import React from "react";
import StyledScaledComponent from "./StyledScaledContent";

let dashBoxStyle = {
  width: "30%",
  height: "0",
  paddingBottom: "30%",
  border: "2px solid lightGrey",
  margin: "auto auto",
  borderRadius: "5%",
  overflow: "hidden",
  background: "var(--dashGridBoxBackground)",

  //   justifyContent: "spaceAround",
};

const DashboardBoxScale = function ({
  title,
  clickFunction,
  content,
  padding,
  top,
  left,
  transform,
  transformOrigin,
}) {
  return (
    <div style={dashBoxStyle}>
      <div
        onClick={clickFunction}
        style={{
          background: "var(--mainHeader)",
          alignSelf: "flex-start",
          // margin: "0px auto 0px auto",
          color: "var(--headerWhiteFont)",
          textAlign: "center",
          border: "2px solid var(--mainHeader)",
          cursor: "pointer",
        }}
      >
        <h3>{title}</h3>
      </div>
      <div style={{ position: "relative" }}>
        <StyledScaledComponent
          padding={padding}
          top={top}
          left={left}
          transformOrigin={transformOrigin}
          transform={transform}
        >
          {content}
        </StyledScaledComponent>
      </div>
    </div>
  );
};
export default DashboardBoxScale;
