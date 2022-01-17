import DynamicSchedule from "../StyledComponents/tables/DynamicSchedule";
import StyledPage from "../StyledComponents/StyledPage";

function DaySchedule() {
  return (
    <StyledPage
      style={{ position: "absolute", margin: "auto 50px", alignSelf: "center" }}
    >
      <DynamicSchedule style={{ margin: " auto", position: "relative" }} />
    </StyledPage>
  );
}

export default DaySchedule;
