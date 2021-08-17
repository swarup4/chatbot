const express = require('express');
const http = require('http');
// const https = require('https');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const socket = require('socket.io');

// const Sequelize = require('sequelize');
const config = require('./config/config');

// Modules
const users = require('./modules/users');
const chats = require('./modules/chat');

const app = express();
const server = http.createServer(app);
let io = socket(server);

const port = config.port;


if(config.database == "mongodb"){
    mongoose.connect('mongodb://localhost:27017/chatapp', { useNewUrlParser: true, useFindAndModify: false }, () => {
        console.log("Database is Connected");
    });
    mongoose.set('useFindAndModify', false);
}else{
    const sequelize = require('./config/db');
    const sequelizeInit = require('./modules/sequelizeInit');
    sequelize.connect((message) => {
        if(message.code == 200){
            // sequelizeInit
        }
    });
}


app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(users);
app.use(chats);


let counter = 0;
io.on("connection", (socket) => {
    counter++;
    console.log(counter + " user has connected!");

    socket.on("message", (data) => {
        console.log(data);
        io.emit("message", data);
    });

    socket.on("typing", (userdata) => {
        io.emit("typing", userdata);
        setTimeout(()=>{
            io.emit("typing", "");
        }, 5000);
    })

    // socket.on("disconnect", () => {
    //     console.log(counter + "user disconnected");
    // });
});

server.listen(port, () => {
    console.log("Server is Running in " + port);
});

// module.exports = app;
