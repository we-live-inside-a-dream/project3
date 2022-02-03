import React, { useEffect, useState } from "react";
import StyledPage from "../reusable/styled-page/StyledPage";
import StyledPageTitle from "../reusable/styled-page/StyledPageTitle";
import moment from "moment";
import DashboardGridNav from "./DashboardGridNav";
// import HighlightsHeader from "./HighlightsHeader";

function HomeDashBoardPage() {
  const [currentHour, setCurrentHour] = useState(moment().hour());
  const [userName, setUserName] = useState("Brian");
  const [hourGreeting, setHourGreeting] = useState("");

  useEffect(() => {
    let isMounted = true;
    let getGreeting = function () {
      let hourValue;
      if (currentHour >= 0 && currentHour < 12) {
        hourValue = "morning";
      } else if (currentHour >= 12 && currentHour <= 17) {
        hourValue = "afternoon";
      } else {
        hourValue = "evening";
      }
      if (isMounted) {
        setHourGreeting(hourValue);
      }
    };
    getGreeting();
    return () => (isMounted = false);
  }, [currentHour]);

  return (
    <>
      <StyledPage>
        <StyledPageTitle
          style={{ marginTop: "50px" }}
        >{`Good ${hourGreeting}, ${userName}!`}</StyledPageTitle>
        {/* <HighlightsHeader style={{ color: "darkGrey" }} /> */}
        <DashboardGridNav />
      </StyledPage>
    </>
  );
}

export default HomeDashBoardPage;
