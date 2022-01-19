// import StyledButton from "./StyledComponents/Inputs/StyledButton";







const BreaksComponent = (props) => {
    const myIndex = props.index;
    const myBreakys = props.breakys;
    const onRemoveBreak=props.onRemoveBreak
  

   
  
    return (
    
            <div key={myIndex}>
              <div>{myBreakys.name},{myBreakys.start},{myBreakys.end}
                <button
                   onClick={() => {
                       onRemoveBreak(myIndex);
                    }}>
                  X
                </button>
                     </div> 
              </div>);
  };
  
  export default BreaksComponent