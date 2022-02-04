import React from "react";
import StyledPage from "../../components/reusable/styled-page/StyledPage";
import StyledPageTitle from "../../components/reusable/styled-page/StyledPageTitle";
import EventEditForm from "../../components/events/EventEditForm";

function EventsPage() {
  return (
    <div>
      <StyledPage>
        <StyledPageTitle title="EVENTS CALENDAR" />
        <EventEditForm />
      </StyledPage>
    </div>
  );
}

export default EventsPage;
