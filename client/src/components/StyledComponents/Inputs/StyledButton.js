import React from "react";
import styled from "styled-components";


// border: ${(props)=>props.border||"10px"}


const StyledButton = styled.button`
  font-size:${(props)=>props.fontSize ||"1em"};
  padding: ${(props)=>props.padding || "0.8rem"};
  margin:${(props)=>props.margin};
  text-align: center;
  color: white;
  background-color: #4488AB;
  border: 2px solid #4488AB;
  border-radius: 3px;
  filter: drop-shadow(5px 5px 10px grey);
`;

export default StyledButton;
