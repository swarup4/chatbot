const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../../../config/config');
const userMod = require('../models/userModel');
// const userHelper = require('../helpers/usersHelper');

const router = express.Router();

// const helpers = new userHelper();

function login(req, res, next) {
    userMod.authModels.findOne({ username: req.body.username, password: req.body.password, status: 1 }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            if (data != null) {
                let obj = {};
                obj.id = data._id;
                obj.username = data.username;
                obj.fname = data.fname;
                obj.gender = data.gender;
                let token = jwt.sign(obj, config.secret, { expiresIn: config.secretTimeout });
                obj.token = token;
                req.userData = obj;
                next();
            } else {
                res.json({
                    status: 0,
                    message: "User is Deactivated"
                });
            }
        }
    });
}

// Get All Users
router.get('/allUsers', (req, res) => {
    userMod.authModels.find({}, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

// Get All Users based on Id
router.get('/users/userid=:userId', (req, res) => {
    let userId = req.params.userId;
    userMod.authModels.findOne({ _id: userId }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

router.post('/login', login, (req, res) => {
    debugger;
    let userData = req.userData;
    userMod.authModels.findByIdAndUpdate(userData.id, { token: userData.token }, (err, req) => {
        debugger;
        if (err) {
            res.send(err);
        } else {
            res.send(userData);
        }
    })
});

router.post('/signup', (req, res) => {
    if (Array.isArray(req.body) == true) {
        userMod.authModels.insertMany(req.body, (err, data) => {
            if (err) {
                res.send(err);
            } else {
                res.json(data);
            }
        })
    } else {
        let authMod = new userMod.authModels(req.body);
        authMod.save((err, data) => {
            if (err) {
                res.send(err);
            } else {
                res.json(data);
            }
        });
    }

});

router.put('/updateUserDetails/:id', (req, res) => {
    let id = req.params.id;
    let userData = req.body;
    userMod.authModels.findByIdAndUpdate(id, userData, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

router.delete('/deactivateAccount/:id', (req, res) => {
    let id = req.params.id;
    userMod.authModels.findByIdAndUpdate(id, { "status": 0 }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.json({ status: 1, message: "Account is Deactivated" });
        }
    });
});
router.put('/activateAccount/:id', (req, res) => {
    let id = req.params.id;
    userMod.authModels.findByIdAndUpdate(id, { "status": 1 }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.json({ status: 1, message: "Account is Activated" });
        }
    });
});

router.get('/serachUser/:user', (req, res) => {
    let name = req.params.user;
    userMod.authModels.find({ fname: { $regex: name, $options: 'i' } }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});
router.put('/logout/:id', (req, res) => {
    let userId = req.params.id;
    userMod.authModels.findByIdAndUpdate(userId, { token: "" }, (err, req) => {
        if (err) {
            res.send(err);
        } else {
            res.json({ status: 1, message: "User Successfully Logout" });
        }
    })
})

module.exports = router;