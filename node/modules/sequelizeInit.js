const express = require('express');
const userMod = require('./users/models/mysql/userModels');

const router = express.Router();

router.get('/', (req, res) => {
    userMod.Auth.sync().then(() => {
        return userMod.Auth.create({
            fname: "Swarup",
            lastName: "Saha",
            username: "Swarup7",
            email: "swarup.saha004@hotmail.com",
            password: "Swarup@123",
            gender: "Male"
        });
    }).then(() => {
        userMod.Details.sync().then(() => {
            return userMod.Details.create({
                userid: 1,
                phone: 9035845781,
                address: "1st main, 1st Block, Koramangala"
            })
        })
    }).then(() => {
        res.send("Inserted");
    });
})
