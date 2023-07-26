import React, { useEffect, useState, useRef } from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./chatBody";
import ChatFooter from "./ChatFooter ";
import { setMessages, getUsers } from "../store/actions/index";

import { connect } from "react-redux";

const ChatPage = ({ socket, messages, setMessages }) => {
  const [typingStatus, setTypingStatus] = useState("");
  const lastMessageRef = useRef(null);

  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
  }, [socket, messages, setMessages]);

  useEffect(() => {
    // scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.on("typingResponse", (data) => setTypingStatus(data));
  }, [socket]);

  useEffect(() => {
    socket.on("endOfTypingResponse", (data) => setTypingStatus(""));
  }, [socket]);

  useEffect(() => {
    socket.on("updatedMessageResponse", (data) => setMessages(data));
  }, [socket, messages, setMessages]);

  return (
    <div className="chat">
      <ChatBar />
      <div className="chat__main">
        <ChatBody typingStatus={typingStatus} lastMessageRef={lastMessageRef} />
        <ChatFooter />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const {
    chat: { socket, messages },
    user: { users },
  } = state;
  return {
    socket,
    messages,
    users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMessages: (data) => dispatch(setMessages(data)),
    getUsers: (data) => dispatch(getUsers(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
