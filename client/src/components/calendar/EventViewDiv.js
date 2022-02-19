import React from "react";

let eventViewStyle = {
  position: "fixed",
  top: "50%",
  left: "0",
  right: "0",
  bottom: "0",
  backgroundColor: "white",
  zIndex: "1000",
  color: "black",
  height: "250px",
  width: "250px",
  border: "1px solid lightGrey",
  borderRadius: "5px",
  margin: "auto",
};

function EventViewDiv(eventToReveal) {
  console.log("FROM THE MODAL", eventToReveal);
  return (
    <div style={eventViewStyle}>
      <h3>{eventToReveal.title}</h3>
      <p>{eventToReveal.startDate}</p>
    </div>
  );
}

export default EventViewDiv;
