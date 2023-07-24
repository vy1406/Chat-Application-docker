import React, { useState } from "react";
import { connect } from "react-redux";

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState("");

  const handleTyping = () =>
    socket.emit("typing", `${localStorage.getItem("username")} is typing`);

  const handleEndOfTyping = () =>
    socket.emit(
      "endOfTyping",
      `${localStorage.getItem("username")} finished typing`
    );

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem("username")) {
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("username"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage("");
  };
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
          //onKeyUp={handleEndOfTyping}
          onMouseOut={handleEndOfTyping}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  const {
    chat: { socket },
  } = state;
  return {
    socket,
  };
};


export default connect(mapStateToProps)(ChatFooter);
