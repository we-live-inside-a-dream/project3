import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StyledPage from "../../components/reusable/styled-page/StyledPage";
import StyledPageTitle from "../../components/reusable/styled-page/StyledPageTitle";
import EventEditForm from "../../components/events/EventEditForm";

function EventsPage() {
  let params = useParams();
  let eventId = params.id;
  const [event, setEvent] = useState();

  // useEffect(() => {
  //   const fetchEvent = async () => {
  //     let fetchResult = await fetch(process.env.REACT_APP_ELECTRON_SERVER+
  //       '/api/event/:id/' + eventId
  //     )
  //     let fetchedEvent = await fetchResult.json()
  //     console.log('Fetched Event', fetchedEvent)
  //     setEvent(fetchedEvent)
  //   }
  //   fetchEvent()
  // },[eventId])

  async function updateEvent(updatedEvent) {
    await fetch(process.env.REACT_APP_ELECTRON_SERVER+"/api/:id", +eventId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEvent),
    });
  }

  return (
    <div>
      <StyledPage>
        <StyledPageTitle title="EVENTS CALENDAR" />
        <EventEditForm existingValues={event} onSave={updateEvent} />
      </StyledPage>
    </div>
  );
}

export default EventsPage;
