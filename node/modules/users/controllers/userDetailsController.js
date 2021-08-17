const express = require('express');
const jwt = require('jsonwebtoken');
const userMod = require('../models/userModel');
const userHelper = require('../helpers/usersHelper');
const config = require('../../../config/config');
const multer = require('multer');
const router = express.Router();

const userHelp = new userHelper();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../chatApp/src/assets/')
    },
    filename: (req, file, cb) => {
        let fileName = file.originalname;
        let arr = fileName.split('.');
        let fileType = arr[arr.length - 1];
        cb(null, arr[0] + '-' + Date.now() + '.' + fileType);
    }
});
const upload = multer({ storage: storage });

router.get('/:id', userHelp.checkSessionExpired, (req, res) => {
    let userId = req.params.id;
    userMod.userDetailsModels.findOne({userid: userId}, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            if(data == null){
                res.json({});
            }else{
                res.send(data);
            }
        }
    });
});

router.post('/addUserDetails', userHelp.checkUserExist, (req, res) => {
    console.log(req.body);
    let details = req.body;
    let userDetails = new userMod.userDetailsModels(details);
    userDetails.save((err, data) => {
        if(err){
            res.send(err);
        }else{
            res.send(data);
        }
    });
});

router.put('/uploadPhoto/:id', upload.single('profile'), function (req, res, next) {
    let userId = req.params.id;
    let imageName = "assets/" + req.file.filename;
    userMod.userDetailsModels.findOneAndUpdate({ userid: userId }, {image: imageName}, (err, data) => {
        if(err){
            res.send(err);
        }else{
            data.image = imageName;
            res.send(data);
        }
    });
});

router.put('/updateUserDetails/:id', (req, res) => {
    let id = req.params.id;
    let userData = req.body;
    userMod.userDetailsModels.findByIdAndUpdate({ userid: userId }, userData, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

module.exports = router;