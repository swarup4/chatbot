const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require("mongoose");
const should = chai.should();

const userMod = require('../modules/users/models/userModel');
const server = require('../testServer');

chai.use(chaiHttp);

describe('Users', () => {
    beforeEach((done) => {
        userMod.authModels.remove({}, (err) => {
            done();
        });
    });
    describe('Get User', () => {
        it('Get All User Data', (done) => {
            chai.request(server)
                .get('/api/user/auth/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    // res.body.length.should.be.eql(0);
                    done();
                });
        });
    });
    describe('Create User', () => {
        it('Insert New Records', (done) => {
            let data = {
                fname: "Swarup",
                lname: "Saha",
                username: "Swarup7",
                email: "swarup.saha004@hotmail.com",
                password: "Swarup@123",
                gender: "M"
            }
            chai.request(server)
                .post('/api/user/auth/signup')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('User Created Successfully');
                    done();
                });
        });
    });

    describe('Login User', () => {
        it('Login User', (done) => {
            // Create Demo Data. Because Each & Every time Record will Deleted.
            let users = new userMod.authModels({ fname: "Swarup", lname: "Saha", username: "Swarup7", email: "swarup.saha004@hotmail.com", password: "Swarup@123", gender: "M" });
            users.save((err, book) => {
                let data = {
                    username: "Swarup7",
                    password: "Swarup@123"
                }
                chai.request(server)
                    .post('/api/user/auth/login')
                    .send(data)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('id');
                        res.body.should.have.property('username');
                        res.body.should.have.property('time');
                        done();
                    });
            });
        });
    });
    describe('Serach Users', () => {
        it('Serach Existing User', (done) => {
            let users = new userMod.authModels({ fname: "Swarup", lname: "Saha", username: "Swarup7", email: "swarup.saha004@hotmail.com", password: "Swarup@123", gender: "M" });
            users.save((err, book) => {
                let user = "rup";
                chai.request(server)
                    .get('/api/user/auth/serachUser/' + user)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        done();
                    });
            });
        });
    });
    describe('Activate Account', () => {
        it('Activate Existing Deactivate Account', (done) => {
            let users = new userMod.authModels({ fname: "Swarup", lname: "Saha", username: "Swarup7", email: "swarup.saha004@hotmail.com", password: "Swarup@123", gender: "M" });
            users.save((err, book) => {
                chai.request(server)
                .put('/api/user/auth/activateAccount/' + users._id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql("Account is Activated");
                    done();
                });
            });
        });
    });
    describe('Deactivate Account', () => {
        it('Deactivate Existing Account', (done) => {
            let users = new userMod.authModels({ fname: "Swarup", lname: "Saha", username: "Swarup7", email: "swarup.saha004@hotmail.com", password: "Swarup@123", gender: "M" });
            users.save((err, book) => {
                chai.request(server)
                .delete('/api/user/auth/deactivateAccount/' + users._id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql("Account is Deactivated");
                    done();
                });
            });
        });
    });
});