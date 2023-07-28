const express = require("express");
const controller = require("../controller/user");

const router = express.Router();

router.post("/adduser", controller.addUser);

router.get("/getusers", controller.getUsers);

router.post("/signin", controller.signIn);

router.post("/signout", controller.signOut);

router.post("/deleteuser", controller.deleteUser);

module.exports = router;
