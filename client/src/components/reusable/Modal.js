import React from "react";
// import StyledButton from "./Inputs/StyledButton";
import styled from "styled-components";

const ModalInner = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 10px;
  z-index: 1000;
  /* border: 10px solid #4488ab; */
  border-radius: 10px;
  h1 {
    text-align: center;
    grid-column-start: 1;
    grid-column-end: 3;
    margin: 0;
  }
`;

const ModalOverlay = styled.div`
  /* border: ${(props) => props.border || "10px"}; */
  display: block;
  position: fixed;
  /* width: 100%; */
  top: 0px;
  left: 0;
  right: 0;
  bottom: 0px;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`;

function Modal({ open, children, onClose }) {
  if (!open) return null;

  return (
    <>
      <ModalOverlay onClick={onClose} />
      {
        <ModalInner>
          {children}
          {/* <StyledButton onClick={onClose}>X</StyledButton> */}
        </ModalInner>
      }
    </>
  );
}

export default Modal;
