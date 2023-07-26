import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { signOut, getUsers } from "../store/actions/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

const ChatBody = ({
  messages,
  lastMessageRef,
  typingStatus,
  signOut,
  user,
  getUsers,
}) => {
  const navigate = useNavigate();
  const handleLeaveChat = async () => {
    await signOut(user.username);
    await getUsers();
    localStorage.removeItem("username");
    localStorage.removeItem("room");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <header className="chat__mainHeader">
        <p>{`Connected in room ${localStorage.getItem("room")}`}</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>
      <div className="message__container">
        {messages &&
          messages.length > 0 &&
          messages
            .filter((data) => data.room === localStorage.getItem("room"))
            .map((message) =>
              message.name === localStorage.getItem("username") ? (
                <div className="message__chats" key={message.id}>
                  <p className="sender__name">You</p>
                  <div className="message__sender">
                    <p>{message.text}</p>
                    <div
                      className={
                        message.status === true
                          ? "chat-bubble read"
                          : "chat-bubble not-read"
                      }
                    >
                      <FontAwesomeIcon icon={faCheckDouble} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="message__chats" key={message.id}>
                  <p>{message.name}</p>
                  <div className="message__recipient">
                    <p>{message.text}</p>
                  </div>
                </div>
              )
            )}

        <div className="message__status">
          <p>{typingStatus}</p>
        </div>
        <div ref={lastMessageRef} />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const {
    user: { user },
    chat: { messages },
  } = state;
  return {
    user,
    messages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: (username) => dispatch(signOut(username)),
    getUsers: (username) => dispatch(getUsers(username)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBody);
