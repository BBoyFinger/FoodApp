import React from "react";
import "./style.css";
import Chat from "./Chat/Chat";
import Contact from "./Contact/Contact";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllConversationList } from "../../../../actions/ChatAction";
import { updateIdConversation } from "../../../../actions/ChatAction";
import axios from "axios";
function AppChatAdmin() {
  const [currentIdChat, setCurrentIdChat] = useState("");
  const conversationList = useSelector((state) => state.chat.conversationList);
  const [newMessage, setNewMessage] = useState({});
  const [messages, setMessages] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllConversationList());
  }, []);

  useEffect(() => {
    if (conversationList && !currentIdChat) {
      dispatch(updateIdConversation(conversationList[0]));
      setCurrentIdChat(conversationList[0]?._id);
      localStorage.setItem("currentIdChat", conversationList[0]?._id);
    }
    if (conversationList && currentIdChat) {
      const getAllMessageByConversation = async () => {
        const { data } = await axios.get(
          `http://localhost:5555/api/chats/message?idConversation=${currentIdChat}`
        );
        setMessages(data.messageList);
      };
      getAllMessageByConversation();
    }
  }, [conversationList]);

  return (
    <section id="appchat">
      <span>Messages</span>
      <div className="appchat">
        <Contact
          conversationList={conversationList}
          currentIdChat={currentIdChat}
          setCurrentIdChat={setCurrentIdChat}
          setNewMessage={setNewMessage}
        />
        <div className="chat">
          <Chat
            messages={messages}
            setMessages={setMessages}
            currentIdChat={currentIdChat}
            setCurrentIdChat={setCurrentIdChat}
            newMessage={newMessage}
          />
        </div>
      </div>
    </section>
  );
}

export default AppChatAdmin;
