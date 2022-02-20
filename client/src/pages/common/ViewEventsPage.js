import React, { useEffect, useState, useContext } from "react";
import AuthenticationContext from "../../components/login/AuthenticationContext";

function ViewEventsPage() {
  const [allEvents, setAllEvents] = useState();
  const [supervisorEvents, setSupervisorEvents] = useState();
  const [managerEvents, setManagerEvents] = useState();
  const [adminEvents, setAdminEvents] = useState();
  const [myEvents, setMyEvents] = useState();
  const [monthStart, setMonthStart] = useState();
  const [monthEnd, setMonthEnd] = useState();
  const authContext = useContext(AuthenticationContext);
  let user = authContext.user;

  //   useEffect(() => {
  //     const getEventsAll = async function () {
  //       let allEventsList = await fetch(`/api/events/event/get-for-employees`);
  //       let eventsList = await allEventsList.json();
  //       console.log(eventsList);
  //       setAllEvents(eventsList);
  //     };
  //     getEventsAll();
  //   }, [user._id]);

  //   useEffect(() => {
  //     const getEventsAll = async function () {
  //       let allEventsList = await fetch(`/api/events/event/get-for-supervisors`);
  //       let eventsList = await allEventsList.json();
  //       console.log(eventsList);
  //       setSupervisorEvents(eventsList);
  //     };
  //     getEventsAll();
  //   }, [user._id]);

  //   useEffect(() => {
  //     const getEventsAll = async function () {
  //       let allEventsList = await fetch(`/api/events/event/get-for-supervisors`);
  //       let eventsList = await allEventsList.json();
  //       console.log(eventsList);
  //       setAllEvents(eventsList);
  //     };
  //     getEventsAll();
  //   }, [user._id]);

  useEffect(() => {
    console.log("usertype", user.permissions);
    const getEventsAll = async function () {
      let allEventsList = await fetch(
        `/api/events/event/get-by-month?start=${monthStart}&end=${monthEnd}`
      );
      let eventsList = await allEventsList.json();
      console.log(eventsList);
      setAllEvents(eventsList);
    };
    getEventsAll();
  }, [user.permissions]);

  return (
    <div>
      {allEvents?.map((event) => {
        return <p>{event.title}</p>;
      })}
    </div>
  );
}

export default ViewEventsPage;
