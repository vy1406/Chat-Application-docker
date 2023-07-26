const { validationResult } = require("express-validator");
const { Message, User } = require("../../models/index");
const errorHandlers = require("../util/errors");

const checkingAllUsersStatus = async (room) => {
    const allUsersLoginAndInRoom = await User.find({
      status: true,
      room: room,
    });
    const allUsers = await User.find({});
    const usersLoggedInStatus =
      allUsersLoginAndInRoom.length === allUsers.length;
    return usersLoggedInStatus;
};

exports.addMessage = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    errorHandlers.validErrors(errors);
    const usersLoggedInStatus = await checkingAllUsersStatus(req.body.room);
    const newMessage = new Message(req.body);
    if (usersLoggedInStatus) {
      newMessage.status = true;
    }
    await newMessage.save();
    res.status(201).json({ message: "הודעה נוספה בהצלחה" });
  } catch (error) {
    errorHandlers.nextError(error, next);
  }
};

exports.getMessages = async (req, res, next) => {
  try {
    const usersLoggedInStatus = await checkingAllUsersStatus(req.body.room);
    if (usersLoggedInStatus) {
      await Message.updateMany({}, { $set: { status: true } });
    }
    const messages = await Message.find({});
    res.status(200).json(messages);
  } catch (error) {
    errorHandlers.nextError(error, next);
  }
};
