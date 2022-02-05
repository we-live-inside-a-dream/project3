import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'
import { useConversations } from '../contexts/ConversationsProvider'
import InputLabel from "@mui/material/InputLabel"
import {
  // StyledEmployeeForm,
  StyledFormWrapper,
  StyledForm,
  StyledInput,
  StyledButton,
  StyledModal,
  OneColumn,
} from "../../reusable/Inputs/StyledEmployeeForm.js";
export default function NewConversationModal({ setIsOpen }) {
  const [selectedContactIds, setSelectedContactIds] = useState([])
  const { contacts } = useContacts()
  const { createConversation } = useConversations()

  function handleSubmit(e) {
    e.preventDefault()

    createConversation(selectedContactIds)
    setIsOpen(false)
  }

  function handleCheckboxChange(contactId) {
    setSelectedContactIds(prevSelectedContactIds => {
      if (prevSelectedContactIds.includes(contactId)) {
        return prevSelectedContactIds.filter(prevId => {
          return contactId !== prevId
        })
      } else {
        return [...prevSelectedContactIds, contactId]
      }
    })
  }

  return (
    <>
    <StyledModal>

    <InputLabel>Create Convorsation</InputLabel>
      <div>
        <StyledForm onSubmit={handleSubmit}>
          {contacts.map(contact => (
            <Form.Group controlId={contact._id} key={contact._id}>
              <Form.Check
                type="checkbox"
                value={selectedContactIds.includes(contact._id)}
                label={contact.firstName+contact.lastName}
                onChange={() => handleCheckboxChange(contact._id)}
                />
            </Form.Group>
          ))}
          {/* <Button type="submit">Create</Button> */}
          <StyledButton onClick={handleSubmit}>SUBMIT</StyledButton>
        </StyledForm>
      </div>
          </StyledModal>
    </>
  )
}
