const express = require('express');
const chatModel = require('../models/chatModel');
// const userHelper = require('../helpers/usersHelper');

const router = express.Router();

// const helpers = new userHelper();

router.get('/getChatId/userid=:userId&senderId=:senderUserId', (req, res) => {
    let userId = req.params.userId;
    let senderId = req.params.senderUserId;
    chatModel.chatModels.findOne({ $or: [
        {userid: userId, senderUserId: senderId}, {senderUserId: userId, userid: senderId}
    ]}, (err, data) => {
        if(err){
            res.send(err);
        }else{
            res.send(data);
        }
    })
});

// Get Added User List
router.get('/getAddedUser/userid=:userId', (req, res) => {
    let userId = req.params.userId;
    chatModel.chatModels.find({ $or: [
        {userid: userId}, {senderUserId: userId}
    ]}, (err, data) => {
        if(err){
            res.send(err);
        }else{
            res.send(data);
        }
    })
});

router.get('/message/:chatId', (req, res) => {
    let chatsId = req.params.chatId;
    chatModel.chatDataModels.find({chatId: chatsId}, (err, data) => {
        if(err){
            res.send(err);
        }else{
            res.send(data);
        }
    });
})

router.post('/addChats', (req, res) => {
    let message = req.body;
    let chats = new chatModel.chatDataModels(message);
    chats.save((err, data) => {
        if(err){
            res.send(err);
        }else{
            res.send(data);
        }
    });
});

router.post('/addChatUser', (req, res) => {
    let chatMod = new chatModel.chatModels(req.body);
    chatMod.save((err, data) => {
        if(err){
            res.send(err);
        }else{
            let obj = {
                status: 1,
                message: "User is Added"
            };
            res.json(obj);
        }
    });
});

module.exports = router;