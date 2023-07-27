const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("../models/user");
const Message = require("../models/message");
const { userRoutes, chatRoutes } = require("./api/index");

const app = express();
const PORT = 8080;

// Middleware setup
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(userRoutes);
app.use(chatRoutes);

const http = require("http").Server(app);
const cors = require("cors");

app.use(cors());

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


mongoose
  //.connect("mongodb://localhost:27017/chat", { // local
    .connect("mongodb://host.docker.internal:27017/chat", {   // docker
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    http.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));
