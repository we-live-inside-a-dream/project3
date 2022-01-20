import styled from "styled-components";

// border: ${(props)=>props.border||"10px"}


const StyledInput = styled.input`
  font-size: 1rem;
  padding: 10px;
  margin: 10px;
  color: #4488AB;
  background-color: white;
  border: ${(props)=>props.border|| '2px solid #4488AB'};
  border-radius: 3px;
  filter: drop-shadow(5px 5px 10px grey);
  ::placeholder {
    color: palevioletred;
  }
`;
export default StyledInput;
