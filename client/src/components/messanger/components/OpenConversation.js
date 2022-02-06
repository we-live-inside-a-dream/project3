import React, { useState, useCallback } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider';

export default function OpenConversation() {
  const [text, setText] = useState('')
  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  }, [])
  const { sendMessage, selectedConversation } = useConversations()

  function handleSubmit(e) {
    e.preventDefault()

    sendMessage(
      selectedConversation.recipients.map(r => r.id),
      text,
      console.log(selectedConversation)
    )
    setText('')
  }

  return (
    <div>

          {selectedConversation.messages.map((message, index) => {
            const lastMessage = selectedConversation.messages.length - 1 === index
            return (
              <div
                ref={lastMessage ? setRef : null}
                key={index}             
              >
                <div>
                  {message.text}  {/* should be justify left */}
                </div>
                <div>
                  {message.fromMe ? 'You' : message.senderName}     {/* if fromMe === true justify right */}
                </div>
              </div>
            )
          })}

      <Form onSubmit={handleSubmit}>
          <Form.Group className="m-2">
            <InputGroup>
              <Form.Control
                as="textarea"
                // required
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{ height: "75px", resize: "none" }}
              />

              <Button type="submit">Send</Button>
            </InputGroup>
          </Form.Group>
        </Form>
    </div>
  )
}
