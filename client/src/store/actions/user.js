import * as actionTypes from "./actionTypes";
import customAxios from "../../axios";

export const addUser = (data) => {
  const { firstName, lastName, email, username, age, goTo } = data;
  return (dispatch) => {
    customAxios
      .post("/adduser", { firstName, lastName, email, username, age })
      .then((response) => {
        dispatch(getUsers());
        console.log("משתמש הוסף בהצלחה");
      })
      .then(() => goTo())
      .catch((error) => console.log("הוספת משתמש נכשלה", error));
  };
};

export const getUsers = () => {
  return (dispatch) => {
    customAxios
      .get("/getusers")
      .then((response) => {
        dispatch(setUsers(response.data.users));
      })
      .catch((error) => console.log("הוספת משתמש נכשלה", error));
  };
};

const setUsers = (users) => {
  return {
    type: actionTypes.SET_USERS,
    users,
  };
};

export const signIn = (data) => {
  const { username, goTo } = data;
  return (dispatch) => {
    customAxios
      .post("/signin", { username })
      .then((response) => {
        dispatch(setUser(response.data.user));
      })
      .then(() => goTo())
      .catch((error) => console.log("כניסת משתמש נכשלה", error));
  };
};

const setUser = (user) => {
  return {
    type: actionTypes.SET_USER,
    user,
  };
};
