import React, { useEffect, useState, useRef } from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./chatBody";
import ChatFooter from "./ChatFooter ";
import { getUsers } from "../store/actions/index";

import { connect } from "react-redux";

const ChatPage = ({ socket, getUsers }) => {
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");
  const lastMessageRef = useRef(null);

  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.on("typingResponse", (data) => setTypingStatus(data));
  }, [socket]);

  useEffect(() => {
    socket.on("endOfTypingResponse", (data) => setTypingStatus(''));
  }, [socket]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="chat">
      <ChatBar />
      <div className="chat__main">
        <ChatBody
          messages={messages}
          typingStatus={typingStatus}
          lastMessageRef={lastMessageRef}
        />
        <ChatFooter />
      </div>
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
    getUsers: () => dispatch(getUsers()),
   // setTypingStatus: (data) => dispatch(setTypingStatus(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
