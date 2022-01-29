import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";

const StyledDropDown = styled(Select)`
  font-size: 1em;
  text-align: center;
  color: #4488ab;
  background-color: white;

  width: 300px;
`;

export default function StyledDropDownInput() {
  return <StyledDropDown />;
}

// export default StyledDropDownInput;
