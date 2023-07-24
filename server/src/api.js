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
    res.status(500).json({ error: "יצירת משתמש נכשלה" });
  }
});

router.get("/getusers", async (req, res) => {
  try {
    // const users = await User.find({status:true});
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: `הבאת משתמשים נכשלה, ${err}` });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { username: req.body.username },
      { status: true },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "כניסת משתמש נכשלה" });
  }
});

router.post("/signout", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { username: req.body.username },
      { status: false }
    );
    res.status(204).json({ message: "המשתמש נותק" });
  } catch (err) {
    res.status(500).json({ error: "ניתוק משתמש נכשל" });
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
