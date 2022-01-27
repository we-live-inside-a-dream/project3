import StyledButton from "../reusable/Inputs/StyledButton";







const BreaksComponent = (props) => {
    const myIndex = props.index;
    const myBreakys = props.breakys;
    const onRemoveBreak=props.onRemoveBreak
    const myKey = props.myKey
  

   
  
    return (
    
            <div key={myKey}>
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