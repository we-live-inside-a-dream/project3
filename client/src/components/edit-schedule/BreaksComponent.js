import StyledButton from "../reusable/Inputs/StyledButton";







const BreaksComponent = (props) => {
    const myIndex = props.index;
    const myBreakys = props.breakys;
    const onRemoveBreak=props.onRemoveBreak
  

   
  
    return (
    
            <div key={myIndex}>
              <div>{myBreakys.name}:{myBreakys.start}-{myBreakys.end}
                <StyledButton
                  padding ={"0px"}
                  margin ={"5px"}
                   onClick={() => {
                       onRemoveBreak(myIndex);
                    }}>
                  x
                </StyledButton>
                     </div> 
              </div>);
  };
  
  export default BreaksComponent