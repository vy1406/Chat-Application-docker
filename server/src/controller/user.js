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
    const dbNewUser = await User.create({
      age,
      firstName,
      lastName,
      email,
      username,
    });
    if (!dbNewUser) {
      const error = new Error("הוספת משתמש נכשלה");
      throw error;
    }
    res.status(201).json({ message: `משתמש ${username} הוסף בהצלחה` });
  } catch (error) {
    errorHandlers.nextError(error, next);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const dbUsers = await User.find({ status: true });
    res.status(200).json(dbUsers);
  } catch (error) {
    errorHandlers.nextError(error, next);
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const dbUser = await User.findOneAndUpdate(
      { username: req.body.username },
      { status: true, room: req.body.room },
      { new: true }
    );
    if (!dbUser) {
      const error = new Error("משתמש לא קיים");
      throw error;
    }
    req.user = dbUser;
    res.status(200).json(dbUser);
  } catch (error) {
    errorHandlers.nextError(error, next);
  }
};

exports.signOut = async (req, res, next) => {
  try {
    const dbUser = await User.findOneAndUpdate(
      { username: req.body.username },
      { status: false },
      { new: true }
    );
    if (!dbUser){
      const error = new Error("משתמש לא קיים");
      throw error;
    }
    res.status(204).json({ message: "המשתמש נותק" });
  } catch (error) {
    errorHandlers.nextError(error, next);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
      const username = req.body.username.toLowerCase();
     //TODO: Check that the user I want to delete is not currently logged in
      const dbUser = await User.findOne({username:username});
      if (!dbUser) {
          const error = new Error('המשתמש לא נמצא');
          throw error;
      }
      await dbUser.deleteOne();
      res.status(200).json({ message: `המשתמש ${username} נמחק בהצלחה` });
  } catch (error) {
    errorHandlers.nextError(error, next);
  }
}
