import React, { useState } from "react";
import { connect } from "react-redux";
import { addMessage } from "../store/actions/index";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const ChatFooter = ({ socket, addMessage }) => {
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
   // toast.success('הודעה נשלחה בהצלחה!', {
     // position: toast.POSITION.TOP_RIGHT,
    //});
    if (message.trim() && localStorage.getItem("username")) {
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("username"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
        room: localStorage.getItem("room"),
        status: false,
      });
      addMessage({
        text: message,
        name: localStorage.getItem("username"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
        room: localStorage.getItem("room"),
        status: false,
      });
    }
    setMessage("");
  };
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="כתיבת הודעה"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
          onMouseOut={handleEndOfTyping}
        />
        <button className="sendBtn">שלח</button>
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
const mapDispatchToProps = (dispatch) => {
  return {
    addMessage: (data) => dispatch(addMessage(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatFooter);
