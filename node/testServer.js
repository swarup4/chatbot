const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const app = express();
const users = require('./modules/users');
const chats = require('./modules/chat');

const port = 3001;

mongoose.connect('mongodb://localhost:27017/chattestapp', { useNewUrlParser: true, useFindAndModify: false }, () => {
    console.log("Database is Connected");
});
// mongoose.set('useFindAndModify', false);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(users);
app.use(chats);

app.listen(port, ()=>{
    console.log("Server is Running in " + port);
});

module.exports = app;