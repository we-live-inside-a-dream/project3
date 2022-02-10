import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import AuthenticationContext from "../../components/login/AuthenticationContext";

import { StyledButton } from "../reusable/Inputs/StyledEmployeeForm";

export const ContactsList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [empNames, setEmpNames] = useState();
  const [recipients, setRecipients] = useState();
  const [contactsData, setContactsData] = useState([]);
  const authContext = useContext(AuthenticationContext);
  let user = authContext.user;

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
        return contactsData.push({
          value: `${person._id}`,
          label: `${person.firstName} ${person.lastName}`,
        });
      });
    }
  }, [empNames]);

  //   let recipientIds = [];
  async function postData() {
    //     recipients?.map((x) => {
    //       recipientIds.push(x.value);
    //     });

    let newConversation = {
      members: [...recipients],
    };
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
    </>
  );
};
