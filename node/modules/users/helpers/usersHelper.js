const jwt = require('jsonwebtoken');
const userMod = require('../models/userModel');
const config = require('../../../config/config');

class helper {
    checkUserExist(req, res, next) {
        let userId = req.body.userid;
        userMod.userDetailsModels.findOne({ userid: userId }, (err, data) => {
            if (err) {
                res.send(err);
            } else {
                if (data == null) {
                    next();
                } else {
                    res.json({
                        status: 200,
                        message: "User is Already Exist"
                    });
                }
            }
        });
    }
    checkSessionExpired(req, res, next) {
        let token = req.headers.authorization;
        jwt.verify(token, config.secret, (err, data) => {
            if (err) {
                res.status(440).send({
                    success: false,
                    reason: err.name,
                    message: "Your session has Expired"
                });
            } else {
                next();
            }
        });
    }
}

module.exports = helper;