import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";

const StyledDropDown = styled(Select)`
  font-size: 1em;
  text-align: center;
  color: #4488AB;
  background-color: white ;
  border: 2px solid #4488AB;
  filter: drop-shadow(5px 5px 10px grey);
  width: 300px;
`;

export default function StyledDropDownInput() {
  return <StyledDropDown />;
}

// export default StyledDropDownInput;
