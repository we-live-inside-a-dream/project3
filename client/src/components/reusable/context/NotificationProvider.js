import React, { useContext, useEffect, useState } from "react";
import AuthenticationContext from "../../login/AuthenticationContext";

const NotificationsContext = React.createContext();

export function useNotifications() {
  return useContext(NotificationsContext);
}

export function NotificationProvider({ childern }) {
  const authContext = useContext(AuthenticationContext);
  const user = authContext.user;
  const [unread, setUnread] = useState(0);

  const fetchMsgs = async () => {
    let fetchResult = await fetch(`/api/messages/unread?id=${user?._id}`);
    let fetchedUnread = await fetchResult.json();

    setUnread(fetchedUnread);
  };

  useEffect(() => {
    setUnread(0);
  }, []);

  const value = { unread, fetchMsgs };

  return (
    <NotificationsContext.Provider value={value}>
      {childern}
    </NotificationsContext.Provider>
  );
}

export default NotificationProvider;
