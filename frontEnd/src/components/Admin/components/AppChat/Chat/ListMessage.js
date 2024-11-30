import React from "react";

function ListMessage({ messages, user }) {
  return (
    <div className="ad-chatuser-listmessage">
      {messages.length > 0
        ? messages.map((message, index) => (
            <div
              key={index}
              className={
                user.name === message.sender ? "ad-chatuser-listmessage-message me" : "ad-chatuser-listmessage-message"
              }
            >
              <p>{message.message || message.lastMessage}</p>
            </div>
          ))
        : ""}
    </div>
  );
}

export default ListMessage;
