import * as actionTypes from "./actionTypes";
import customAxios from "../../axios";

export const setSocket = (socket) => ({
  type: actionTypes.SET_SOCKET,
  socket,
});


export const setMessages = (messages) => {
  console.log('messages in action :', messages);
    return {
      type: actionTypes.SET_MESSAGES,
      messages,
    };
  };

  

  export const addMessage = (data) => {
    const { text, name, room, socketID } = data;
    return (dispatch) => {
      customAxios
        .post("/addmessage", { text, name, room, socketID })
        .then((response) => {
          console.log("הודעה נשמרה בהצלחה");
        })
        .catch((error) => console.log("הוספת הודעה נכשלה", error));
    };
  };

  

  export const getMessages = () => {
  return (dispatch) => {
    customAxios
      .get("/getmessages")
      .then((response) => {
        dispatch(setMessages(response.data));
      })
      .catch((error) => console.log("הבאת הודעות נכשלה", error));
  };
};
