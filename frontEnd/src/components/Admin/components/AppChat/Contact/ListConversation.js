import React from "react";
import { getFirstCharacterUser } from "../../../../../unitls";

function ListConversation({ currentIdChat, conversationList, onConversationClick }) {
  return (
    <div className="contact-list">
      {conversationList.map((conversation, i) => (
        <div
          key={i}
          className={currentIdChat === conversationList[i]?._id ? "contact-list-item active" : "contact-list-item"}
          onClick={() => onConversationClick(conversation)}
        >
          <div className="contact-list-item-avarta">{getFirstCharacterUser(conversation.nameConversation)}</div>
          <div className="contact-list-item-content">
            <p className="contact-list-item-name">{conversation.nameConversation}</p>
            <span className="contact-list-item-lastmessage"> {conversation.lastMessage} </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListConversation;
