import React from "react";
import { withTheme } from "styled-components";
import StyledScaledComponent from "./StyledScaledContent";
import { Pic } from "../navigation/StyledNavBar";

let dashBoxStyle = {
  width: "30%",
  height: "0",
  paddingBottom: "26%",
  border: "2px solid darkGrey",
  margin: "auto auto",
  borderRadius: "5px",
  overflow: "hidden",
  // background: "var(--dashGridBoxBackground)",
  background: "white",

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
  image,
}) {
  return (
    <div style={dashBoxStyle}>
      <div
        onClick={clickFunction}
        style={{
          background: "var(--mainHeader)",
          alignSelf: "flex-start",
          margin: "0px auto 0px auto",
          color: "var(--headerWhiteFont)",
          // color: "grey",
          // color: "var(--accentColorTitle)",
          borderRadius: "2px",

          textAlign: "center",
          border: "2px solid var(--mainHeader)",
          cursor: "pointer",
          borderBottom: "2px solid var(--mainHeader)",
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
