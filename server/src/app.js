const express = require("express");
const bodyParser = require("body-parser");
const { userRoutes, chatRoutes } = require("./api/index");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(userRoutes);
app.use(chatRoutes);

const cors = require("cors");

app.use(cors());

module.exports = app;
