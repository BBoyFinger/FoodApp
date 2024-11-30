import React from "react";

function ListMessage(props) {
  const { messages, user } = props;
  return (
    <div className="chatuser-listmessage">
      {messages.map((message, i) => (
        <div
          key={i}
          className={
            user.name === message.sender
              ? "chatuser-listmessage-message me"
              : "chatuser-listmessage-message"
          }
        >
          <p>{message.message}</p>
        </div>
      ))}
    </div>
  );
}

export default ListMessage;
