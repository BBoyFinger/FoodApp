import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./appchat.css";
import axios from "axios";
import TypeMessage from "./Message/TypeMessage";
import { useSelector } from "react-redux";
import { MdOutlineOutbond } from "react-icons/md";
import ListMessage from "./Message/ListMessage";

let socket;

function AppChat() {
  const ENDPOINT = "http://localhost:5555";
  const [messages, setMessages] = useState([]);
  const [openChat, setOpenChat] = useState(false);
  const { userInfo } = useSelector((state) => state.userSignin);

  useEffect(() => {
    const getAllMessageByConversation = async () => {
      const { data } = await axios.get(
        `http://localhost:5555/api/chats/message?idUser=${userInfo._id}`
      );
      setMessages(data.messageList);
    };
    getAllMessageByConversation();
  }, []);

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.emit("join_conversation", userInfo._id);
    //setup response
    socket.on("newMessage", (message) => {
      setMessages([...messages, message]);
    });

    // disconnect ||cleanup the effect
    // return () => socket.disconnect();
    // eslint-disable-next-line
  }, [messages]);

  // useEffect(() => {
  // const scrollMessage = () => {
  //   var element = document.querySelector(".chatuser-listmessage");
  // element.scrollTop = element?.scrollHeight;
  // };
  // if (openChat) {
  //   scrollMessage();
  // }
  // });

  const handleChatFormSubmit = async (message) => {
    const sender = userInfo.name;
    console.log("message", message);
    //emit create conversation and chat
    if (!messages || messages?.length === 0) {
      socket.emit("create_conversation", userInfo);

      socket.on("response_room", async (conversation) => {
        const payload = {
          sender,
          message,
          idConversation: conversation._id,
        };
        console.log(payload);
        const { data } = await axios.post(
          "http://localhost:5555/api/chats/save",
          payload
        );
        socket.emit("chat", data);
      });
    } else {
      const idConversation =
        messages[0].idConversation._id || messages[0].idConversation;
      // request save message
      const payload = {
        sender,
        message,
        idConversation,
      };
      const { data } = await axios.post(
        "http://localhost:5555/api/chats/save",
        payload
      );
      console.log("data", data);
      socket.emit("chat", data);
    }
  };
  return (
    <div className="appchat">
      {openChat ? null : (
        <div className="openchat">
          <svg
            onClick={() => setOpenChat(!openChat)}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style={{
              fill: "#fff",
            }}
          >
            <path d="M5 18v3.766l1.515-.909L11.277 18H16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h1zM4 8h12v8h-5.277L7 18.234V16H4V8z"></path>
            <path d="M20 2H8c-1.103 0-2 .897-2 2h12c1.103 0 2 .897 2 2v8c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2z"></path>
          </svg>
        </div>
      )}

      {openChat ? (
        <div className="chatuser">
          <div className="chatuser-user">
            <span className="chatuser-user-name">{userInfo.name}</span>
            <span
              className="chatuser-user-line"
              onClick={() => setOpenChat(!openChat)}
            >
              x
            </span>
          </div>

          {messages ? <ListMessage messages={messages} user={userInfo} /> : ""}

          <TypeMessage onSubmit={handleChatFormSubmit} />
        </div>
      ) : null}
    </div>
  );
}

export default AppChat;
