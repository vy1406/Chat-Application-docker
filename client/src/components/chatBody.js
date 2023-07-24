import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../store/actions/index";

const ChatBody = ({ messages, lastMessageRef, typingStatus, signOut, user }) => {

  const navigate = useNavigate();

  const handleLeaveChat = async() => {
   await signOut(user.username);
    navigate("/");
    //window.location.reload();
  };

  return (
    <>
      <header className="chat__mainHeader">
        <p>{`Connected in room ${localStorage.getItem("roomName")}`}</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div className="message__container">
        {messages.map((message) =>
          message.name === localStorage.getItem("username") ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
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
    user: { user }
  } = state;
  return {
    user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: (username) => dispatch(signOut(username)),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(ChatBody);

