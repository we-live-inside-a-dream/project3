import styled from "styled-components";

// border: ${(props)=>props.border||"10px"}

const StyledButton = styled.button`
  padding: ${(props) => props.padding || "0.8rem"};
  margin: ${(props) => props.margin || "1em"};
  text-align: ${(props) => props.textAlign || "center"};
  color: var(--headerWhiteFont);
  background-color: var(--styledButtonBackground);
  border: 2px solid var(--styledButtonBackground);
  border-radius: 3px;
  cursor: pointer;
  transition-duration: 0.4s;
  &:hover {
    cursor: pointer;
    background-color: var(--styledButtonHoverBackground);
    border: 2px solid var(--styledButtonHoverBorder);
  }
  &:active {
    /* background-color: #3e8e41; */
    box-shadow: 0 2px #666;
    transform: translate(5% 5%);
  }
`;

export default StyledButton;
