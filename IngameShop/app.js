'use strict';

const express = require('express')
const app = express()
const routes = require('./routes/routes')
const port = 3000

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(routes);

app.listen(port, (err) =>{
    if(err) console.log(err);
    else console.log(`IngameShop Express app is listening on port ${port}.`);
});