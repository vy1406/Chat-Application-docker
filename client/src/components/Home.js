import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { signIn, getUsers } from "../store/actions/index";

const Home = ({ signIn, socket }) => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (username.length < 5 || username.length > 10) {
      validationErrors.username = "שם המשתמש חייב להיות בין 5 ל-10 תווים";
    }

    if (room.length < 3 || room.length > 10) {
      validationErrors.room = "החדר צריך להיות בין 3-10 תווים";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    localStorage.setItem("username", username);
    localStorage.setItem("room", room);
    await signIn({ username, room, goTo: () => navigate("/chat") });
    socket.emit("newUser", { username, room, socketID: socket.id });
    socket.emit("updatedMessage", room);
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <form className="home__container" onSubmit={handleSubmit}>
      <h2 className="home__header">התחבר לצ'אט</h2>
      <label htmlFor="username">שם משתמש</label>
      <input
        type="text"
        minLength={5}
        maxLength={10}
        name="username"
        id="username"
        className="input"
        value={username}
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      {errors.username && <p className="error">{errors.username}</p>}
      <label htmlFor="room">שם החדר</label>
      <input
        type="text"
        minLength={3}
        maxLength={10}
        name="room"
        id="room"
        className="input"
        value={room}
        onChange={(e) => {
          setRoom(e.target.value);
        }}
      />
      {errors.room && <p className="error">{errors.room}</p>}
      <button type="submit" className="home__cta">
        התחבר
      </button>
      <button onClick={handleSignUpClick} className="home__signup">
        הרשם
      </button>
    </form>
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
    signIn: (data) => dispatch(signIn(data)),
    getUsers: () => dispatch(getUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
