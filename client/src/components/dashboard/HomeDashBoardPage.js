<<<<<<< HEAD:client/src/components/dashboard/HomeDashBoardPage.js
import React, { useEffect, useState } from "react";
import StyledPage from "../reusable/styled-page/StyledPage";
import StyledPageTitle from "../reusable/styled-page/StyledPageTitle";
import moment from "moment";
import DashboardGridNav from "./DashboardGridNav";
// import HighlightsHeader from "./HighlightsHeader";
=======
import React, { useContext, useEffect, useState } from "react";
import StyledPage from "../../components/reusable/styled-page/StyledPage";
import StyledPageTitle from "../../components/reusable/styled-page/StyledPageTitle";
import moment from "moment";
import AuthenticationContext from "../../components/login/AuthenticationContext";
>>>>>>> 462fef97f4e495d03d466a656029828f792b9f7f:client/src/pages/common/HomeDashBoardPage.js

function HomeDashBoardPage() {
  const [currentHour, setCurrentHour] = useState(moment().hour());
  const [hourGreeting, setHourGreeting] = useState("");
  const authContext = useContext(AuthenticationContext);

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
<<<<<<< HEAD:client/src/components/dashboard/HomeDashBoardPage.js
        <StyledPageTitle
          style={{ marginTop: "50px" }}
        >{`Good ${hourGreeting}, ${userName}!`}</StyledPageTitle>
        {/* <HighlightsHeader style={{ color: "darkGrey" }} /> */}
        <DashboardGridNav />
=======
        <StyledPageTitle>{`Good ${hourGreeting}, ${authContext.user.firstName}!`}</StyledPageTitle>
>>>>>>> 462fef97f4e495d03d466a656029828f792b9f7f:client/src/pages/common/HomeDashBoardPage.js
      </StyledPage>
    </>
  );
}

export default HomeDashBoardPage;
