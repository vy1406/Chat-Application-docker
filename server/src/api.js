// In your routes or controllers
const express = require("express");
const User = require("../models/user");
const Message = require("../models/message");

const router = express.Router();

router.post("/adduser", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: "יצירת משתמש נכשלה" });
  }
});

router.get("/getusers", async (req, res) => {
  try {
    // const users = await User.find({status:true});
    const users = await User.find({status:true});
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
      { status: false },
      { new: true }
    );
    res.status(204).json({ message: "המשתמש נותק" });
  } catch (err) {
    res.status(500).json({ error: "ניתוק משתמש נכשל" });
  }
});

router.post("/addmessage", async (req, res) => {
  try {
    console.log('req.body :', req.body);
   // const newMessage = await Message.create(req.body);
   const newMessage = new Message(req.body);
   await newMessage.save();
    console.log('newMessage :', newMessage);
    res.json(newMessage);
  } catch (err) {
    res.status(500).json({ error: `Error creating message, ${err}` });
  }
});

router.get("/getmessages", async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: `הבאת הודעות נכשלה, ${err}` });
  }
});

module.exports = router;
