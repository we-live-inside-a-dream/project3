import styled from "styled-components";
import React from "react";
import { grid } from "@mui/system";
import CenterStyle from "./CenterStyle";

// appearance: none;
export const CustomSelectStyle = styled.select`
  box-shadow: 0 10px 25 px rgba(0, 0, 0, 0.7);
  font-size: 1.5rem;
  padding: 1em 5em 1em 1.5em;
  background: #4d5061;
  color: white;
  border: 0;
`;
export const BodyStyle = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
`;
export const CustomDiv = styled.div`
  position: relative;
`;
export const CustomArrow = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  background: #3b3c47;
  height: 100%;
  width: 4rem;
  pointer-events: none;
  :before,
  :after {
    --size: 0.65em;

    content: "";
    position: absolute;
    width: 0;
    height: 0;

    /* top: 50%; */
    left: 50%;
    transform: translate(-50%, -50%);
  }
  :before {
    border-left: var(--size) solid transparent;
    border-right: var(--size) solid transparent;
    border-bottom: var(--size) solid rgba(255, 255, 255, 0.5);
    top: 40%;
  }
  :after {
    border-left: var(--size) solid transparent;
    border-right: var(--size) solid transparent;
    border-top: var(--size) solid rgba(255, 255, 255, 0.5);
    top: 60%;
  }
`;
export const CustomSelect = () => {
  return (
    <>
      <BodyStyle>
        <CustomDiv>
          <CustomSelectStyle>
            <option Value="">Lorem.</option>
            <option Value="">Voluptate?</option>
            <option Value="">Quia.</option>
            <option Value="">Offocia.</option>
            <option Value="">Perferendis.</option>
          </CustomSelectStyle>
          <CustomArrow class="custom-arrow"></CustomArrow>
        </CustomDiv>
      </BodyStyle>
    </>
  );
};
