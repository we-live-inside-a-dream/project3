import styled from "styled-components";

const StyledInput = styled.input`
  font-size: 1rem;
  padding: 10px;
  margin: 10px;
  color: white;
  background-color: #4488AB;
  border: 2px solid #fc4445;
  filter: drop-shadow(5px 5px 10px grey);
  ::placeholder {
    color: palevioletred;
  }
`;
export default StyledInput;
