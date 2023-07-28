const express = require("express");
const controller = require("../controller/user");
const { User } = require("../../models/index");
const { body } = require("express-validator");
const { RegexName } = require("../util/validators");

const router = express.Router();

router.post(
  "/adduser",
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage("כתובת המייל אינה תקינה")
      .custom((value, req) => {
        return User.findOne({ email: value }).then((user) => {
          return user
            ? Promise.reject("כתובת המייל כבר קיימת במערכת")
            : Promise.resolve(true);
        });
      }),
    body(
      "username",
      ".על שם המשתמש להכיל אותיות וספרות בלבד ולהיות בין 5 ל 10 תווים"
    )
      .trim()
      .notEmpty()
      .isLength({ min: 5, max: 10 })
      .isAlphanumeric()
      .custom((value, req) => {
        return User.findOne({ username: value }).then((user) => {
          return user
            ? Promise.reject("שם המשתמש כבר קיים במערכת")
            : Promise.resolve(true);
        });
      }),
    body("firstName")
      .trim()
      .custom((value, req) => {
        return RegexName.test(value)
          ? Promise.resolve(true)
          : Promise.reject(
              ".השם יכול להכיל רק אותיות בעברית או אנגלית ולהיות 2 עד 15 תווים"
            );
      }),
    body("lastName")
      .trim()
      .custom((value, req) => {
        return RegexName.test(value)
          ? Promise.resolve(true)
          : Promise.reject(
              ".השם המשפחה יכול להכיל רק אותיות בעברית או אנגלית ולהיות 2 עד 15 תווים"
            );
      }),
    body("age", "גיל צריך להכיל ספרות בלבד באורך של 1-3 תווים ")
      .trim()
      .isLength({ min: 1, max: 3 })
      .isNumeric(),
  ],
  controller.addUser
);

router.get("/getusers", controller.getUsers);

router.post("/signin", controller.signIn);

router.post("/signout", controller.signOut);

router.post("/deleteuser", controller.deleteUser);

module.exports = router;
