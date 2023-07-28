import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { addUser } from "../store/actions/index";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ageRegex = /^(1[0-1][0-9]|120|[1-9][0-9])$/;
;

const SignUp = ({ addUser }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (username.length < 5 || username.length > 10) {
      validationErrors.username = "שם המשתמש חייב להיות בין 5 ל-10 תווים";
    }

    if (!emailRegex.test(email)) {
      validationErrors.email = "כתובת האימייל אינה תקינה";
    }

    if (firstName.length < 2 || firstName.length > 15) {
      validationErrors.firstName = "שם הפרטי חייב להיות בין 2 ל-15 תווים";
    }

    if (lastName.length < 2 || lastName.length > 15) {
      validationErrors.lastName = "שם המשפחה חייב להיות בין 2 ל-15 תווים";
    }

    if (!ageRegex.test(age) || Number(age) < 1) {
      validationErrors.age = "הגיל צריך להיות בין 10-120";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    await addUser({
      firstName,
      lastName,
      email,
      username,
      age,
      goTo: () => navigate("/"),
    });
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
        minLength={5}
        maxLength={10}
        name="username"
        id="username"
        className="input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {errors.username && <p className="error">{errors.username}</p>}
      <label htmlFor="email">אימייל</label>
      <input
        type="email"
        name="email"
        id="email"
        className="input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <p className="error">{errors.email}</p>}
      <label htmlFor="firstName">שם פרטי</label>
      <input
        type="text"
        minLength={2}
        maxLength={15}
        name="firstName"
        id="firstName"
        className="input"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      {errors.firstName && <p className="error">{errors.firstName}</p>}
      <label htmlFor="lastName">שם משפחה</label>
      <input
        type="text"
        minLength={2}
        maxLength={15}
        name="lastName"
        id="lastName"
        className="input"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      {errors.lastName && <p className="error">{errors.lastName}</p>}
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
      {errors.age && <p className="error">{errors.age}</p>}
      <button type="submit" className="home__cta">
        הרשם
      </button>
      <button onClick={handleBack} className="home__signup">
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
