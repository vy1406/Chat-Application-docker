const { validationResult } = require("express-validator");
const { User } = require("../../models/index");
const nameFixer = require("../util/stringhelpers").capitalize;
const errorHandlers = require("../util/errors");

exports.addUser = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    errorHandlers.validErrors(errors);
    const age = req.body.age;
    const firstName = nameFixer(req.body.firstName);
    const lastName = nameFixer(req.body.lastName);
    const email = req.body.email.toLowerCase();
    const username = req.body.username.toLowerCase();
    const newUser = await User.create({age, firstName, lastName, email, username});
    res.status(201).json({ message: `משתמש ${newUser.username} הוסף בהצלחה` });
  } catch (error) {
    errorHandlers.nextError(error, next);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({ status: true });
    res.status(200).json(users);
  } catch (error) {
   res.status(500).json({ error: "יצירת משתמש נכשלה" });
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate(
      { username: req.body.username },
      { status: true, room: req.body.room },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    //errorHandlers.nextError(error, next);
    res.status(500).json({ error: "כניסת משתמש נכשלה" });
  }
};

exports.signOut = async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate(
      { username: req.body.username },
      { status: false },
      { new: true }
    );
    res.status(204).json({ message: "המשתמש נותק" });
  } catch (error) {
    errorHandlers.nextError(error, next);
  }
};

