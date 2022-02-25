import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import AuthenticationContext from "../../components/login/AuthenticationContext";
import Conversation from "../../components/messanger2/Conversation";
import { useSocket } from "../../components/reusable/context/SocketProvider";
import { StyledButton } from "../reusable/Inputs/StyledEmployeeForm";
import {
  ChatMenu,
  ChatMenuWrapper,
  Convo,
  StyledContactList,
} from "./StyledMessangerPage";

export const ContactsList = ({ setCurrentChat }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [empNames, setEmpNames] = useState();
  const [recipients, setRecipients] = useState();
  const [contactsData, setContactsData] = useState([]);
  const [conversations, setConversations] = useState([]);

  const authContext = useContext(AuthenticationContext);
  let user = authContext.user;

  const value = useSocket();
  const socket = value.socket;
  const fetchUnread = value.fetchUnread;

  useEffect(() => {
    const fetchNames = async () => {
      let fetchResult = await fetch("/api/employeeProfile/employees/names");
      let fetchedNames = await fetchResult.json();
      setEmpNames(fetchedNames);
    };

    fetchNames();
  }, []);

  useEffect(() => {
    if (empNames) {
      empNames.map((person) => {
        if (person._id !== user._id)
          return contactsData.push({
            value: `${person._id}`,
            label: `${person.firstName} ${person.lastName[0]}`,
          });
      });
    }
  }, [empNames]);

  useEffect(() => {
    if (user._id) {
      const getConversations = async () => {
        let id = user._id;
        let fetchResult = await fetch(`api/conversations/${id}`);
        let fetchedConversation = await fetchResult.json();

        setConversations(fetchedConversation);
      };
      getConversations();
      // socket.emit("update");
    }
  }, [user?._id, recipients]);

  //   let recipientIds = [];
  async function postData() {
    //     recipients?.map((x) => {
    //       recipientIds.push(x.value);
    //     });

    let newConversation = {
      members: [
        { value: user._id, label: `${user.firstName} ${user.lastName[0]}` },
        ...recipients,
      ],
    };
    console.log("newConversation", newConversation);
    updateConversation(newConversation);
    // recipientIds = [];
    setRecipients("");
  }

  async function updateConversation(updatedConvo) {
    //   console.log(" 'creating' availability for", firstName, lastName);
    await fetch("/api/conversations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedConvo),
    });
  }

  const recipientHandler = (newRecipient) => {
    setRecipients(newRecipient);
    console.log("new Recipients", newRecipient);
  };

  return (
    <>
      <ChatMenu>
        <ChatMenuWrapper>
          <Select
            isMulti
            name="empNames"
            value={recipients}
            options={contactsData}
            onChange={recipientHandler}
            className="basic-multi-select"
            classNamePrefix="select"
          ></Select>
          <StyledButton onClick={postData}>SELECT FRIENDS</StyledButton>
          <StyledContactList>
            {conversations?.map((c) => (
              <div
                key={c._id}
                onClick={() => {
                  setCurrentChat(c);
                  fetchUnread();
                }}
              >
                <Conversation id={user._id} conversation={c} />
              </div>
            ))}
          </StyledContactList>
        </ChatMenuWrapper>
      </ChatMenu>
    </>
  );
};
