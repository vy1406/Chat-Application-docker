// In your routes or controllers
const express = require("express");
const User = require("../models/user");
const Message = require("../models/message");

const router = express.Router();

router.post("/adduser", async (req, res) => {
  try {
    console.log("req.body :", req.body);
    const newUser = await User.create(req.body);

    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Error creating user" });
  }
});

router.get("/getusers", async (req, res) => {
  try {
    const users = await User.find({});

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: `Error get users, ${err}` });
  }
});

router.post("/signin", async (req, res) => {
  console.log("signin :", req.body.username);
  try {
    const user = await User.findOne({ username: req.body.username });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Error creating user" });
  }
});

// Create a new message
router.post("/messages", async (req, res) => {
  try {
    const newMessage = await Message.create(req.body);
    res.json(newMessage);
  } catch (err) {
    res.status(500).json({ error: "Error creating message" });
  }
});

module.exports = router;
