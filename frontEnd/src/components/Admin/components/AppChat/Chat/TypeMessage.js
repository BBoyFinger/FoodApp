import React, { useState } from "react";

function TypeMessage(props) {
  const { onSubmit } = props;
  const [value, setValue] = useState("");

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(value);
    console.log("");

    if (!onSubmit || value === "") return;

    onSubmit(value);
    //set value after submit
    setValue("");
  };
  return (
    <div className="ad-chatuser-typemessage">
      <input placeholder="Type a message" type="text" value={value} onChange={handleValueChange} />
      <button onClick={handleFormSubmit}>Send</button>
    </div>
  );
}

export default TypeMessage;
