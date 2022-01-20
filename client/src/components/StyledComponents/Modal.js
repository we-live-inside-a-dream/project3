import React from "react";
import StyledButton from "./Inputs/StyledButton";
import styled from "styled-components";

const ModalInner = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 10px;
  z-index: 1000;
  border: 10px solid #4488AB;
  border-radius: 10px;
`;

const ModalOverlay = styled.div`
  border: ${(props)=>props.border||"10px"};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`;


function Modal({ open, children, onClose }) {
  if (!open) return null;

  return (
    <>
      <ModalOverlay onClick={onClose} />
      {
        <ModalInner >
          {children}
          {/* <StyledButton onClick={onClose}>Close Modal</StyledButton> */}
        </ModalInner>
      }
    </>
  );
}

export default Modal;
