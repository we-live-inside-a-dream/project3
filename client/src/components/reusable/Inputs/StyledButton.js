import styled from "styled-components";

// border: ${(props)=>props.border||"10px"}

const StyledButton = styled.button`
  font-size: ${(props) => props.fontSize || "1em"};
  padding: ${(props) => props.padding || "0.8rem"};
  margin: ${(props) => props.margin || "1em"};
  text-align: ${(props) => props.textAlign || "center"};
  color: white;
  background-color: #078898;
  border: 2px solid #078898;
  border-radius: 3px;
  cursor: pointer;
  transition-duration: 0.4s;
  &:hover {
    cursor: pointer;
    background-color: #e37222;
    border: 2px solid #eeaa78;
  }
  &:active {
    /* background-color: #3e8e41; */
    box-shadow: 0 2px #666;
    transform: translate(5% 5%);
  }
`;

export default StyledButton;
