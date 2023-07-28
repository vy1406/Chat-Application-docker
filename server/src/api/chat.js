const express = require("express");
const controller = require("../controller/chat");
const { body } = require("express-validator");
const { RegexName } = require("../util/validators");

const router = express.Router();

router.post(
  "/addmessage",
  [
    body("text")
      .trim()
      .isLength({ min: 1, max: 280 })
      .withMessage("הודעה חייבת להכיל בין 1-280 תווים בלבד"),
    body(
      "name",
      ".על שם המשתמש להכיל אותיות וספרות בלבד ולהיות בין 5 ל 10 תווים"
    )
      .trim()
      .notEmpty()
      .isLength({ min: 5, max: 10 })
      .isAlphanumeric(),
    body("room", "שם החדר חייב להיות בין 3-10 תווים בלבד")
      .trim()
      .notEmpty()
      .isLength({ min: 3, max: 10 }),
    body("socketID").trim().isString(),
    body("status", "סטטוס הודעה חייב להיות ערך בוליאני").trim().isBoolean(),
  ],
  controller.addMessage
);

router.post("/getmessages", controller.getMessages);

module.exports = router;
