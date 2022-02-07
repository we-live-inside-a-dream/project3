import React, { useContext, useEffect, useState } from "react";
import StyledPage from "../../components/reusable/styled-page/StyledPage";
import StyledPageTitle from "../../components/reusable/styled-page/StyledPageTitle";
import moment from "moment";
import AuthenticationContext from "../../components/login/AuthenticationContext";

import DashboardGridNav from "../../components/dashboard/DashboardGridNav";

function HomeDashBoardPage() {
  const [currentHour, setCurrentHour] = useState(moment().hour());
  const [hourGreeting, setHourGreeting] = useState("");
  const authContext = useContext(AuthenticationContext);
  let user = authContext.user;

  useEffect(() => {
    let getGreeting = function () {
      let hourValue;
      if (currentHour >= 0 && currentHour < 12) {
        hourValue = "morning";
      } else if (currentHour >= 12 && currentHour <= 17) {
        hourValue = "afternoon";
      } else {
        hourValue = "evening";
      }
      setHourGreeting(hourValue);
    };
    getGreeting();
  }, [currentHour]);
  return (
    <>
      <StyledPage>
        <StyledPageTitle
          style={{ marginTop: "50px" }}

          // >{`Good ${hourGreeting}, ${user._id}`}</StyledPageTitle>
        >{`Good ${hourGreeting}, ${user?.firstName}!`}</StyledPageTitle>

        {/* <HighlightsHeader style={{ color: "darkGrey" }} /> */}
        <DashboardGridNav />
      </StyledPage>
    </>
  );
}

export default HomeDashBoardPage;
