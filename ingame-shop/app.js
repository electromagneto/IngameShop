"use strict";

const express = require('express');
const Controller = require('./controllers/controller');
const router = require('./routers');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(router)

app.listen(port, () => {
  console.log(`Express app listening on port ${port}.`);
});