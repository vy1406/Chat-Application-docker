import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getUsers } from "../store/actions/index";

const ChatBar = ({ users, user, getUsers }) => {
  useEffect(() => {
    getUsers();
  }, [getUsers, users]);

  const filteredUsers = users.filter((user) => user.status === true);
  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>
      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {filteredUsers &&
            filteredUsers.length > 0 &&
            filteredUsers.map((data) => (
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
  } = state;
  return {
    users,
    user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => dispatch(getUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBar);
