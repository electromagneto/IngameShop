"use strict";

const Controller = require("../controllers/controller");

const router = require("express").Router();

router.get('/', (req, res) => {
  res.send("Hello World");
});

module.exports = router