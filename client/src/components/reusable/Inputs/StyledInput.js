import styled from "styled-components";

// border: ${(props)=>props.border||"10px"}

const StyledInput = styled.input`
  font-size: 1rem;
  padding: 10px;
  margin: 10px;
  color: #4488ab;
  background-color: white;
  border: ${(props) => props.border || "2px solid #4488AB"};
  border-radius: 3px;
`;
export default StyledInput;
