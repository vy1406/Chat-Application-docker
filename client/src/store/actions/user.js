import * as actionTypes from "./actionTypes";
import customAxios from "../../axios";

export const addUser = (data) => {
  const { firstName, lastName, email, username, age, goTo } = data;
  return (dispatch) => {
    customAxios
      .post("/adduser", { firstName, lastName, email, username, age })
      .then((response) => {
       // dispatch(getUsers());
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
        dispatch(setUsers(response.data));
      })
      .catch((error) => console.log("הבאת משתמשים נכשלה", error));
  };
};

export const setUsers = (users) => {
console.log('users in action :', users);
  return {
    type: actionTypes.SET_USERS,
    users,
  };
};

export const signIn = (data) => {
  const { username, roomName, goTo } = data;
  return async (dispatch) => {
    try{
      const response =  await customAxios.post("/signin", { username, roomName })
      await dispatch(setUser(response.data));
      //await dispatch(getUsers());
      await goTo();
    } catch (error) {
      console.log("כניסת משתמש נכשלה", error);
    } 
  };
};

const setUser = (user) => {
console.log('user :', user);
  return {
    type: actionTypes.SET_USER,
    user,
  };
};

export const signOut = username => {
console.log('username action:', username);
  return async (dispatch) => {
    customAxios
      .post("/signout", { username })
      .then((response) => {
        //localStorage.clear()
        //dispatch(setSignOut());
       // dispatch(getUsers());
      })
      .catch((error) =>{
      console.log('error :', error);
       // localStorage.clear()
       // dispatch(setSignOut());
      })
  };
};

// const setSignOut = () => {
//   return { type: actionTypes.SIGN_OUT }
// }


