import React, { useContext,useEffect,useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';

const ContactsContext = React.createContext()

export function useContacts() {
  return useContext(ContactsContext)
}

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useState([])

  useEffect(()=>{
    
      const fetchContactsList = async () => {
        let fetchResult = await fetch(
          "/api/employeeProfile/employees/names"
        );
        let fetchedContacts = await fetchResult.json();
        console.log("Fetched Contatcts", fetchedContacts);
        setContacts(fetchedContacts);
      };
      fetchContactsList();

    

  },[children.id])

  // function createContact(id, name) {
  //   setContacts(prevContacts => {
  //     return [...prevContacts, { id, name }]
  //   })
  // }

  return (
    <ContactsContext.Provider value={{contacts}}>
      {children}
    </ContactsContext.Provider>
  )
}
