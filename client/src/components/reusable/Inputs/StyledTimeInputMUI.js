import { styled } from "@mui/material/styles";
const StyledTimeInput = styled.input`
  font-size: 1em;
  text-align: center;
  color: #fc4445;
  background-color: white;
  border: 2px solid #fc4445;
  filter: drop-shadow(5px 5px 10px grey);
`;

function TimeInput({ value, onChange }) {
  return (
    <div>
      <StyledTimeInput>
        <input type="time" value={value} onChange={onChange}></input>
      </StyledTimeInput>
    </div>
  );
}

export default TimeInput;
