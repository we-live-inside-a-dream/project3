import React, { useContext,useEffect,useState } from 'react'
import AuthenticationContext from "../../components/login/AuthenticationContext";

const NotificationsContext = React.createContext()

export function useNotifications() {
    return useContext(NotificationsContext)

export function NotificationProvider({childern}){
    const authContext = useContext(AuthenticationContext);
    const user = authContext.user;
    const[unread,setUnread]= useState()

useEffect(()=>{
    function countUnreadMsg(){
      const unreadMsgs = messages.filter((m)=>(m.read))
      console.log('unread messages...',unreadMsgs)
    }
    const fetchMsgs = async () => {
        let fetchResult = await fetch(`/api/messages/unread?id=${user._id}`);
        let fetchedUnread = await fetchResult.json();
  
        setUnread(fetchedUnread);
      };
    

},[user._id])
  return(
  <Notification.Provider>
      {childern}
      </Notification.Provider>);
};

export default NotificationProvider;







export function ContactsProvider({ children }) {
 

  function createContact(id, name) {
    setContacts(prevContacts => {
      return [...prevContacts, { id, name }]
    })
  }

  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  )
}
