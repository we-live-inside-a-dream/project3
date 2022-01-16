import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const StyledSubmitButton = styled(Button)`
  font-size: 1em;
  text-align: center;
  color: #fc4445;
  background-color: white;
  border: 2px solid #fc4445;
  filter: drop-shadow(5px 5px 10px grey);
`;

export default function SubmitButton({ title }) {
  return <StyledSubmitButton>SUBMIT</StyledSubmitButton>;
}
