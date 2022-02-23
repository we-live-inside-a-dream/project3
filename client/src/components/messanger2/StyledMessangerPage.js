import styled from "styled-components";

export const StyledMessangerPage = styled.div`
  background-color: var(--styledPage);
  padding: 20px;
  margin: auto;
  position: relative;
  height: calc(90vh - 70px);
  display: flex;
  min-width: 40em;
  filter: drop-shadow(3px 3px 10px lightgrey);
`;

export const StyledContactList = styled.div`
  background-color: var(--styledPage);
  padding: 1em;
  /* min-width: 10em; */
  /* margin: auto; */
  overflow-y: auto;
  position: absolute;
  height: 70%;
  filter: drop-shadow(3px 3px 10px lightgrey);
`;

export const ChatMenu = styled.div`
  flex: 3.5;
`;

export const ChatMenuInput = styled.div`
  width: 90%;
  padding: 10px 0;
  border: none;
  border-bottom: 1px solid gray;
`;

export const ChatMenuWrapper = styled.div`
  padding: 10px;
  height: 100%;
`;

export const ChatBox = styled.div`
  flex: 5.5;
`;

export const ChatBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;

export const ChatBoxTop = styled.div`
  height: 65vh;
  position: relative;
  overflow-y: scroll;
  padding-right: 10px;
`;

export const ChatBoxBottom = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  bottom: 0px;
`;
export const ChatMessageInput = styled.textarea`
  width: 80%;
  height: 90px;
  padding: 10px;
`;
export const Convo = styled.div`
  cursor: pointer;
  &:hover {
    opacity: 0.9;
    transform: scale(0.98);
  }
`;

export const StyledConverstion = styled.div`
  border: 1px solid black;
  position: "relative";
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
  display: none;
  font-size: 10px;
  position: fixed;
  bottom: 30em;
  right: 1em;
  height: 60vh;
  width: 60%;
  /* display: flex; */
  flex-direction: column;
  justify-content: space-between;
  padding: 0.75rem;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  z-index: 1000;
`;
