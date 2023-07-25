import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setUsers, getUsers } from "../store/actions";

const ChatBar = ({ users, user, socket, setUsers, getUsers }) => {


 useEffect(() => {
  socket.on('newUserResponse', (data) => setUsers(data));
}, [socket, users, setUsers]);

useEffect(() => {
  getUsers()
}, [getUsers]);

  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>
      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {users &&
            users.length > 0 &&
            users.map((data) => (
              <p key={data.username}>
                {" "}
                {data.username === user.username
                  ? `${data.username} (You)`
                  : data.username}{" "}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const {
    user: { users, user },
    chat:{socket}
  } = state;
  return {
    users,
    user,
    socket
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUsers: (data) => dispatch(setUsers(data)),
    getUsers: (data) => dispatch(getUsers(data)),
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBar);
