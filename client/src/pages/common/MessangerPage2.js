import "./messenger.css";

import Conversation from "../../components/messanger2/Conversation";
import Message from "../../components/messanger2/Message";
import ChatOnline from "../../components/messanger2/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import AuthenticationContext from "../../components/login/AuthenticationContext";
import axios from "axios";
import { io } from "socket.io-client";

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

  // const [user,setUser]=useState({ "_id" : "61fc6b7939ecd01d0e3a50eb",
  // "firstName" : "Julie",
  // "lastName" : "Weir",
  // "email" : "weirjulieanne@gmail.com",
  // "password" : "juliejuliejulie",
  // "phoneNumber" : "555-666-7777",
  // "positions" : [
  //     "manager"
  // ],
  // "status" : "active",})

  const scrollRef = useRef();

  //socket.on will send data to ("String",(POST)=>{};
  //socket.emit will take data from ("String",FETCH);

  useEffect(() => {
    const origin = window.location.origin;
    const host = origin.replace("http", "ws");
    // console.log("window location...", window.location);
    socket.current = io(host);
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    if (user) {
      socket.current.emit("addUser", user._id);
      socket.current.on("getUsers", (users) => {
        // setOnlineUsers(
        //   user.followings.filter((f) => users.some((u) => u.userId === f))
        // );
      });
    }
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      if (user) {
        try {
          const res = await axios.get("api/conversations/" + user._id);
          setConversations(res.data);
        } catch (err) {
          console.log(user);
          console.log(err);
        }
      }
    };
    getConversations();
  }, [user]);

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
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    //member is an array of Id's for members of convo
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("api/messages", message);
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
            {conversations.map((c) => (
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
        {/* <div className="chatOnline">
            <div className="chatOnlineWrapper">
              <ChatOnline
                onlineUsers={onlineUsers}
                currentId={user._id}
                setCurrentChat={setCurrentChat}
              />
            </div>
          </div> */}
      </div>
    </>
  );
}
