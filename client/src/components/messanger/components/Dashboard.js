import React from 'react'
import Sidebar from './Sidebar';
import OpenConversation from './OpenConversation';
import { useConversations } from '../contexts/ConversationsProvider';
import styled from "styled-components";

const Columns = styled.div`
display: grid
  grid-template-columns:1fr/1fr;



`

export default function Dashboard({ id }) {
  const { selectedConversation } = useConversations()

  return (
    <Columns>
    <div>
      <Sidebar id={id} />
    </div>
    <div>
      {selectedConversation && <OpenConversation />}
    </div>
    </Columns>
  )
}
