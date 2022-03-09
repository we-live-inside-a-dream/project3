import React from "react";
import StyledPage from "../../components/reusable/styled-page/StyledPage";
import StyledPageTitle from "../../components/reusable/styled-page/StyledPageTitle";

function HelpMenuPage() {
  return (
    <div>
      <StyledPage>
        <StyledPageTitle>HELP MENU</StyledPageTitle>
        <h1>Manager Instructions</h1>
        {/* prettier-ignore */}
        <pre>{`
          Create Employee:
            1. Open the card titled EMPLOYEES
            2. From the row of buttons press CREATE NEW
            3. Enter all required information
            4. Press SAVE DETAILS button
            5. Employee will receive an email for setting their password


          Build a schedule:
            1. Open the card titled SCHEDULES
            2. Press the ADD SHIFT button
            3. Enter all required information
            4. Press SUBMIT button

          Approve Time Off/shift swaps:
            1. Open the card titled MANAGER APPROVALS
            2. Above the table select TIMEOFFS or SHIFT SWAPS to view pending requests
            3. Under the APPROVE/DECLINE header select the ✅ or ❌ to approve or  decline a request.
            4. Review details and press CONFIRM

`}
          </pre>

        <h1>Employee Instructions</h1>
        <pre>
          {`
            Request Time Off: 
              1. open card titled TIME OFF
              2. Press REQUEST TIME OFF button
              3. Fill out empty fields
              4. Press APPLY TIME OFF button


          	Offer a shift to other employees: 
              1. Open card titled MY UPCOMING SHIFTS 	
              2. Press the double arrows under the SWAP header on the shift you want to give    away.
              3. Review the shift and press confirm.	

            Bid on a shift from another employee :
              1. Open card titled MY UPCOMING SHIFTS 
              2. Press the VIEW AVAILABLE SHIFTS button
              3. Press the BID icon under the BID header

	          View Schedule:
              1. Open card titled SCHEDULES
              2. Select the view you want to observe from the buttons above the schedule
`}
        </pre>
      </StyledPage>
    </div>
  );
}

export default HelpMenuPage;
