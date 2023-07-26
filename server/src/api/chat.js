const express = require("express");
const controller = require('../controller/chat');
//
//const { body } = require('express-validator');
//const customValidators = require('../util/validators');
//

const router = express.Router();

router.post("/addmessage", controller.addMessage);

router.post("/getmessages", controller.getMessages);

module.exports = router;
