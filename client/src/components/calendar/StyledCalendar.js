import styled from "styled-components";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const StyledCalendar = styled(Calendar)`
  border: 2px solid #8860d0;
  /* filter: drop-shadow(5px 5px 10px grey); */
  background-color: white;
  width: 70%;
  margin: auto;
`;

export default StyledCalendar;
