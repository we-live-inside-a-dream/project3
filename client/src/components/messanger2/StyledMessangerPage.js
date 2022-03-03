import styled from "styled-components";

export const StyledMessangerPage = styled.div`
  margin: ${(props) => props.margin || "auto"};
  padding: ${(props) => props.padding || "10px"};
  .messenger {
    background-color: var(--styledPage);
    /* margin: auto; */
    position: relative;
    height: calc(75vh - 70px);
    display: flex;
    min-width: 40em;
    filter: drop-shadow(3px 3px 10px lightgrey);
  }
  /* .messenger.show {
    margin: 0;
  } */
  .chatBox {
    flex: 2;
    position: relative;
    padding: 1em;
  }
  .chatBoxWrapper {
    padding: 10px;
  }
  .chatBoxTop {
    height: 85%;
    position: relative;
    overflow-y: scroll;
    margin-left: 10px;
  }
  .chatBoxBottom {
    margin-top: 5px;
    /* padding: 1em; */
    display: flex;
    justify-content: space-between;
    position: relative;
    /* left: 1em; */
    bottom: 0;
    right: 0;
    width: 100%;
    height: 15%;
  }
  .chatMessageInput {
    position: relative;
    width: 85%;
    height: 100%;
    padding: 0;
  }
  .sendButton {
    position: relative;
    top: 0;
    right: 0;
    height: 100%;
    width: 15%;
  }

  @media screen and (max-width: 768px) {
    .chatMenu {
      flex: 1;
    }

    .chatMenuInput {
      display: none;
    }

    .chatBox {
      flex: 10;
    }

    .chatOnline {
      flex: 1px;
    }
  }
`;

export const StyledContactList = styled.div`
  background-color: var(--styledPage);
  padding: 1em;
  font-size: 15px;
  height: 75%;

  overflow-y: auto;
  position: absolute;
  right: 1em;
  bottom: 1em;
  left: 0;

  filter: drop-shadow(3px 3px 10px lightgrey);
  /* :hover {
    background-color: rgb(245, 243, 243);
  } */
`;

export const ContactsBox = styled.div`
  flex: 1.5;
  position: relative;
`;

export const ChatMenuInput = styled.div`
  width: 90%;
  padding: 10px 0;
  border: none;
  border-bottom: 1px solid gray;
`;

export const ChatMenuWrapper = styled.div`
  padding: 10px;

  /* height: 100%; */
`;

// export const ChatBox = styled.div`
//   flex: 5.5;
//   position: relative;
// `;

// export const ChatBoxWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   position: relative;
//   height: 100%;
// `;

// export const ChatBoxTop = styled.div`
//   position: relative;
//   overflow-y: scroll;
//   margin-left: 10px;
// `;

// export const ChatBoxBottom = styled.div`
//   margin-top: 5px;
//   padding: 1em;
//   display: flex;
//   align-items: center;
//   position: relative;
//   justify-content: space-between;
//   bottom: 0px;
//   height: 15%;
// `;
export const ChatMessageInput = styled.textarea`
  width: 85%;
  height: 100%;

  /* position: fixed; */
`;
// export const Convo = styled.div`
//   cursor: pointer;
//   &:hover {
//     opacity: 0.9;
//     transform: scale(0.98);
//     background-color: rgb(245, 243, 243);
//   }
// `;

export const StyledConverstion = styled.div`
  border: 1px solid black;
  position: relative;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
    transform: scale(0.98);
    background-color: rgb(245, 243, 243);
  }
`;

export const StyledMessage = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;
export const MessageTop = styled.div`
  display: flex;
`;

export const MessageText = styled.div`
  padding: 10px;
  border-radius: 20px;
  background-color: #1877f2;
  color: white;
  max-width: 300px;
`;

export const ChatPopup = styled.div`
  .popup {
    display: none;
    font-size: 10px;
    position: fixed;
    bottom: 10rem;
    right: 0;
    /* top: 10rem; */
    /* height: 60vh; */
    /* height: 20rem; */
    width: 50%;
    /* display: flex; */
    flex-direction: column;
    /* justify-content: space-between; */
    padding: 0.75rem;
    /* box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.4); */
    border-radius: 10px;
    z-index: 1000;
  }
  .popup.show {
    display: block;
  }
`;

export const SendButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 14%;
`;

export const MessageStyles = styled.div`
  .message {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }
  .messageTop {
    display: flex;
  }
  .messageBottom {
    font-size: 12px;
    margin-top: 10px;
  }
  .messageImg {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }
  .sendername {
  }
  .messageText {
    padding: 10px;
    border-radius: 20px;
    background-color: #1877f2;
    color: white;
    max-width: 300px;
  }
  .message.own {
    align-items: flex-end;
  }
  .message.own .messageText {
    background-color: rgb(245, 241, 241);
    color: black;
  }
`;
export const ChatButton = styled.button`
  position: fixed;
  bottom: 3rem;
  right: 3rem;
  /* background-color: dodgerblue; */
  color: white;
  border-radius: 50%;
  height: 4rem;
  width: 4rem;
  z-index: 100;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.4);
  transition: opacity 0.3s;

  :hover {
    opacity: 1;
  }
`;

export const MessageLogo = styled.img`
  display: fixed;
  /* padding: 0px 0px; */
  /* margin: 0px auto; */
  max-width: 65px;
  height: auto;
`;
