import "./messenger.css";

import Conversation from "../../components/messanger2/Conversation";
import Message from "../../components/messanger2/Message";
import ChatOnline from "../../components/messanger2/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import AuthenticationContext from "../../components/login/AuthenticationContext";
import axios from "axios";
import { io } from "socket.io-client";
import { ContactsList } from "../../components/messanger2/ContactsList";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const authContext = useContext(AuthenticationContext);
  const user = authContext.user;

  const scrollRef = useRef();

  //socket.on will send data to ("String",(POST)=>{};
  //socket.emit will take data from ("String",FETCH);

  useEffect(() => {
    if (!user._id) return;
    let id = user._id;
    console.log("room id", id);
    const origin = window.location.origin;
    const host = origin.replace("http", "ws");
    socket.current = io(host, { query: { id } });

    // console.log(socket.current);
  }, [user._id]);

  useEffect(() => {
    if (socket.current == null) return;
    socket.current.on("getMessage", (data) => {
      console.log("get message...", data);
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, [socket]);

  useEffect(() => {
    console.log("got the message", arrivalMessage);
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    if (user._id) {
      const getConversations = async () => {
        console.log(user._id);
        let id = user._id;
        let fetchResult = await fetch(`api/conversations/${id}`);
        let fetchedConversation = await fetchResult.json();
        console.log("fetched Convo", fetchedConversation);
        setConversations(fetchedConversation);
      };

      getConversations();
    }
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("api/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat, arrivalMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("user", user);
    const message = {
      sender: user._id,
      senderName: user.firstName + " " + user.lastName[0],
      text: newMessage,
      conversationId: currentChat._id,
    };
    //member is an array of Id's for members of convo
    const recipients = currentChat.members.map((r) => r.value);
    console.log("socket...", socket.current);
    console.log("user id", user._id);
    console.log("currentChat", currentChat);
    console.log("recipients", recipients);
    // let newRecipients = recipients.slice(user._id);
    // console.log("new Rec", newRecipients);
    socket.current.emit("sendMessage", {
      recipients,
      sender: user._id,
      text: newMessage,
    });

    try {
      const res = await axios.post("api/messages", message);
      // console.log("messages...", messages);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* <Topbar /> */}
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            <ContactsList />
            {conversations?.map((c) => (
              <div key={c._id} onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div key={m._id} ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
