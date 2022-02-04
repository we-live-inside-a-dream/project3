import styled from "styled-components";

// border: ${(props)=>props.border||"10px"}

const StyledScaledComponent = styled.div`
  padding: ${(props) => props.padding};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  transform-origin: ${(props) => props.transformOrigin};
  transform: ${(props) => props.transform};
  position: absolute;
  cursor: pointer;
`;

export default StyledScaledComponent;
