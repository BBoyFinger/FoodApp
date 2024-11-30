import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import {
  getAllConversationList,
  showConversation,
  updateIdConversation,
  updateLastMessageConversation,
} from "../../../../../actions/ChatAction";
import ListConversation from "./ListConversation";

function Contact({
  currentIdChat,
  setCurrentIdChat,
  conversationList,
  setNewMessage,
}) {
  let socket;
  const ENDPOINT = "localhost:5555";
  const dispatch = useDispatch();
  // const idConversation = useSelector((state) => state.chat.idConversation);

  // useEffect(() => {
  //     dispatch(SeenConversation(idConversation))
  // }, [idConversation])

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.on("lastMessage", async (data) => {
      await dispatch(updateLastMessageConversation(data));
      dispatch(getAllConversationList());
    });

    socket.on("show-me", (data) => {
      setNewMessage(data);
      dispatch(showConversation(data));
      dispatch(getAllConversationList());
    });

    return () => socket.disconnect();
  }, []);

  const onConversationClick = (conversation) => {
    dispatch(updateIdConversation(conversation));
    setCurrentIdChat(conversation?._id);
    localStorage.setItem("currentIdChat", conversation?._id);
  };
  return (
    <div className="contact">
      {conversationList ? (
        <ListConversation
          currentIdChat={currentIdChat}
          conversationList={conversationList}
          onConversationClick={onConversationClick}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Contact;
