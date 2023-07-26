import * as actionTypes from "./actionTypes";
import customAxios from "../../axios";
import { showAlert } from "../../UI/Notification";

export const addUser = (data) => {
  const { firstName, lastName, email, username, age, goTo } = data;
  return (dispatch) => {
    customAxios
      .post("/adduser", { firstName, lastName, email, username, age })
      .then((response) => {
        console.log("משתמש הוסף בהצלחה");
      })
      .then(() => goTo())
      .catch((error) =>dispatch(showAlert(`הוספת משתמש נכשלה : ${error}`, 'error')));
  };
};

export const getUsers = () => {
  return (dispatch) => {
    customAxios
      .get("/getusers")
      .then((response) => {
        dispatch(setUsers(response.data));
      })
      .catch((error) =>dispatch(showAlert(`הבאת משתמשים נכשלה : ${error}`, 'error')));
  };
};

export const setUsers = (users) => {
  return {
    type: actionTypes.SET_USERS,
    users,
  };
};

export const signIn = (data) => {
  const { username, room, goTo } = data;
  return async (dispatch) => {
    try {
      const response = await customAxios.post("/signin", { username, room });
      await dispatch(setUser(response.data));
      await goTo();
    } catch (error) {
      dispatch(showAlert(`כניסת משתמש נכשלה : ${error}`, 'error'))
    }
  };
};

const setUser = (user) => {
  return {
    type: actionTypes.SET_USER,
    user,
  };
};

export const signOut = (username) => {
  console.log("username action:", username);
  return async (dispatch) => {
    customAxios
      .post("/signout", { username })
      .then((response) => {})
      .catch((error) =>dispatch(showAlert(`יציאת משתמש נכשלה : ${error}`, 'error')));
  };
};
