import React from "react";
import styled from "styled-components";

// border: ${(props)=>props.border||"10px"}

const StyledButton = styled.button`
  font-size: ${(props) => props.fontSize || "1em"};
  padding: ${(props) => props.padding || "0.8rem"};
  margin: ${(props) => props.margin || "1em"};
  text-align: center;
  color: white;
  background-color: #4488ab;
  border: 2px solid #4488ab;
  border-radius: 3px;
  cursor: pointer;
  transition-duration: 0.4s;
  filter: drop-shadow(5px 5px 10px grey);
  .button:hover {
    background-color: white;
    color: #4488ab;
    border: 1px solid #4488ab;
    cursor: pointer;
    transition-duration: 0.4s;
  }
  .button:active {
    box-shadow: 0 5px #666;
    transform: translateY(3px);
  }
`;

export default StyledButton;
