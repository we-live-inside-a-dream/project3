// import StyledButton from "./StyledComponents/Inputs/StyledButton";

const BreakysComponent = (props) => {
    const myIndex = props.index;
    const myBreakys = props.breakys;
    const onRemoveBreak=props.onRemoveBreak
  

    //  onRemoveBreak(index) {
    //     console.log("removing superpower at index", index);
    //     let newBreak = [...breaks];
    //     newBreak.splice(index, 1);
    //     console.log("superpowers are now", newBreak);
    //     // setBreaks(newBreak);
    //   }  
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
  
  export default BreakysComponent