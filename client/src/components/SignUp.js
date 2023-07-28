import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { addUser } from '../store/actions/index';

const SignUp = ({ addUser }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    await addUser({firstName, lastName, email, username, age, goTo: () => navigate("/")})
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <form className="home__container" onSubmit={handleSubmit}>
      <h2 className="home__header">הרשם לצ'אט</h2>
      <label htmlFor="username">שם משתמש</label>
      <input
        type="text"
        minLength={6}
        name="username"
        id="username"
        className="input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
       <label htmlFor="email">אימייל</label>
      <input
        type="text"
        minLength={1}
        name="email"
        id="email"
        className="input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
       <label htmlFor="firstName">שם פרטי</label>
      <input
        type="text"
        minLength={1}
        name="firstName"
        id="firstName"
        className="input"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
       <label htmlFor="lastName">שם משפחה</label>
      <input
        type="text"
        minLength={1}
        name="lastName"
        id="lastName"
        className="input"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
       <label htmlFor="age">גיל</label>
      <input
        type="text"
        minLength={1}
        name="age"
        id="age"
        className="input"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button type="submit" className="home__cta">הרשם</button>
      <button  onClick={handleBack} className="home__signup">
      חזור
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
    addUser: (data) => dispatch(addUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
