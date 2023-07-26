import * as actionTypes from "./actionTypes";
import customAxios from "../../axios";
import { showAlert } from "../../UI/Notification";

export const addMessage = (data) => {
  const { text, name, room, socketID, status } = data;
  return (dispatch) => {
    customAxios
      .post("/addmessage", { text, name, room, socketID, status })
      .then((response) => {
        dispatch(getMessages(room));
      })
      .catch((error) =>dispatch(showAlert(`הוספת הודעה נכשלה : ${error}`, 'error')));
  };
};

export const getMessages = (room) => {
  return (dispatch) => {
    customAxios
      .post("/getmessages", { room })
      .then((response) => {
        dispatch(setMessages(response.data));
        console.log("הבאת הודעות בוצע בהצלחה");
      })
      .catch((error) =>dispatch(showAlert(`הבאת הודעות נכשלה : ${error}`, 'error')));
  };
};

export const setSocket = (socket) => ({
  type: actionTypes.SET_SOCKET,
  socket,
});

export const setMessages = (messages) => {
  return {
    type: actionTypes.SET_MESSAGES,
    messages,
  };
};


