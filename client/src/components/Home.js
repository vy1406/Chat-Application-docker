import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getUsers, signIn } from '../store/actions/index';

const Home = ({ getUsers, signIn }) => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    await signIn({ username, roomName, goTo: () => navigate("/chat")})
    localStorage.setItem("username", username);
    localStorage.setItem("roomName", roomName);
    //sends the username and socket ID to the Node.js server
    //socket.emit("newUser", { username, roomName, socketID: socket.id });
    await getUsers()
  };



  const handleSignUpClick = () => {
  console.log('handleSignUpClick :');
    // Navigate to the specified page when the button is clicked
    navigate('/signup');
  };

  return (
    <form className="home__container" onSubmit={handleSubmit}>
      <h2 className="home__header">Sign in to Open Chat</h2>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        minLength={6}
        name="username"
        id="username"
        className="input"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      />
       <label htmlFor="roomname">Room Name</label>
      <input
        type="text"
        minLength={1}
        name="roomname"
        id="roomname"
        className="input"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <button type="submit" className="home__cta">SIGN IN</button>
      <button onClick={handleSignUpClick} className="home__signup">SIGN UP</button>
    </form>
    
  );
};

const mapStateToProps = (state) => {
  const {
    chat: { socket },
  } = state;
  return {
    socket
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (data) => dispatch(signIn(data)),
    getUsers: () => dispatch(getUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);