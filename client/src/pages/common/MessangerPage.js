import React,{useState,useContext} from 'react'
import Login from '../../components/messanger/components/Login'
import useLocalStorage from '../../components/messanger/hooks/useLocalStorage';
import Dashboard from '../../components/messanger/components/Dashboard'
import { ContactsProvider } from '../../components/messanger/contexts/ContactsProvider'
import { ConversationsProvider } from '../../components/messanger/contexts/ConversationsProvider';
import { SocketProvider } from '../../components/messanger/contexts/SocketProvider';
import AuthenticationContext from "../../components/login/AuthenticationContext";

function MessangerPage() {
  const [id, setId] = useState('61f9ba8ed69e5da25ae15c18')

  const authContext = useContext(AuthenticationContext)

  return(

    
    <SocketProvider id={id}>
      <ContactsProvider id={id}>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
     </SocketProvider>
  )


}

export default MessangerPage;
