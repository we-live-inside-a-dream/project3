import React from "react";

let dashBoxStyle = {
  // width: "30%",
  // height: "0",
  // paddingBottom: "30%",
  // border: "2px solid lightGrey",
  // margin: "auto auto",
  // borderRadius: "5%",
  // overflow: "hidden",
  // background: "var(--dashGridBoxBackground)",

  //   justifyContent: "spaceAround",
  width: "30%",
  height: "0",
  paddingBottom: "26%",
  border: "2px solid darkGrey",
  margin: "auto auto",
  borderRadius: "3%",
  overflow: "hidden",
  // background: "var(--dashGridBoxBackground)",
  background: "white",
};

const DashboardBox = function ({ title, clickFunction, content }) {
  return (
    <div style={dashBoxStyle}>
      <div
        onClick={clickFunction}
        style={{
          background: "var(--mainHeader)",
          // alignSelf: "flex-start",
          // margin: "0px auto 0px auto",
          color: "var(--headerWhiteFont)",
          // textAlign: "center",
          // border: "2px solid var(--mainHeader)",
          // cursor: "pointer",
          // background: "var(--mainHeader)",
          alignSelf: "flex-start",
          // margin: "0px auto 0px auto",
          // color: "var(--headerWhiteFont)",
          // color: "grey",
          // color: "var(--accentColorTitle)",

          textAlign: "center",
          border: "2px solid var(--mainHeader)",
          cursor: "pointer",
          // borderBottom: "2px solid darkGrey",
        }}
      >
        <h3>{title}</h3>
      </div>
      <div>
        <div style={{ padding: "8px" }}>{content}</div>
      </div>
    </div>
  );
};
export default DashboardBox;
