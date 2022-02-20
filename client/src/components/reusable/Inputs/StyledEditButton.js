import styled from "styled-components";

// border: ${(props)=>props.border||"10px"}

const StyledEditButton = styled.button`
  font-size: ${(props) => props.fontSize || "1em"};
  padding: ${(props) => props.padding || "0.3rem"};
  margin: ${(props) => props.margin || ".1em"};
  text-align: center;
  color: var(--accentColorTitle);
  background-color: var(--transparent);
  border-radius: 3px;
  border: var(--transparent);
  cursor: pointer;
`;

export default StyledEditButton;
