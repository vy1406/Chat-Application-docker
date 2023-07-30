const mongoose = require("mongoose");
const User = require("../models/user");
const Message = require("../models/message");
const app = require("./app");
require("dotenv").config({ path: ".env" });

const PORT = 8080;

const http = require("http").Server(app);

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("typing", (data) => socket.broadcast.emit("typingResponse", data));
  socket.on("endOfTyping", (data) =>
    socket.broadcast.emit("endOfTypingResponse", data)
  );

  socket.on("message", (data) => {
    socketIO.emit("messageResponse", data);
  });

  //Listens when a new user joins the server
  socket.on("newUser", async (data) => {
    //const user= await User.find({username:data.username});
    const updatedUsres = await User.find({ status: true });

    //Sends the list of users to the client
    await socketIO.emit("newUserResponse", updatedUsres);
  });

  socket.on("updatedMessage", async (room) => {
    const allUsersLoginAndInRoom = await User.find({
      status: true,
      room: room,
    });
    const allUsers = await User.find({});
    const usersLoggedInStatus =
      allUsersLoginAndInRoom.length === allUsers.length;
    if (usersLoggedInStatus) {
      await Message.updateMany({}, { $set: { status: true } });
    }
    const messages = await Message.find({});
    await socketIO.emit("updatedMessageResponse", messages);
  });

  socket.on("disconnect", async () => {
    console.log("🔥: A user disconnected");
    //Updates the list of users when a user disconnects from the server
    const updatedUsres = await User.find({ status: true });

    // console.log(users);
    //Sends the list of users to the client
    socketIO.emit("newUserResponse", updatedUsres);
    socket.disconnect();
  });
});

let dbConnection = "";
if (process.env.DOCKER_COMPOSE && process.env.DOCKER_COMPOSE === "yes") {
  dbConnection = "mongodb://host.docker.internal:27017/chat";
} else {
  dbConnection = "mongodb://localhost:27017/chat";
}
mongoose
  .connect(dbConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(
      `Connected to MongoDB ${
        process.env.DOCKER_COMPOSE && process.env.DOCKER_COMPOSE === "yes"
          ? "in a Docker environment"
          : "in a local environment"
      }`
    );
    http.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));
