const express = require('express');
const router = express.Router();

// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';

/* GET api listing. */
router.get('/', (req, res) => {
    res.send('api works');
});

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

// importing bcrypt in order to perform password hashing
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const e = require('express');
const secret = 'secret'

//declaring and initializing a BCRYPT_SALT_ROUND constant to add salt to the hashing (Salts help to create unique passwords even if passwords from different users are different)
const BCRYPT_SALT_ROUNDS = 12;

const client = new MongoClient('mongodb+srv://JoeJoe:Password@readit.4g2rw.mongodb.net/readItData?retryWrites=true&w=majority')
const db = client.db('readItData');
// var db;
// MongoClient.connect('mongodb+srv://JoeJoe:Password@readit.4g2rw.mongodb.net/readItData?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, (err, database) => {
//     if (err) return console.log(err);
//     db = database.db('readItData');
// });

// add new book into database
router.route('/books').post(function (req, res) {
    try {
        var decoded = jwt.verify(req.body.token, secret);
        doc = {
            'name': req.body.name,
            'author': req.body.author,
            'synopsis': req.body.synopsis
        }
        db.collection('books').insertOne(doc, (err, results) => {
            if (err) return console.log(err);
            console.log('saved to database');
            res.send(results);
        })
    } catch (error) {
        res.send({result: 'invalid token'})
    }
})

// retrieve book information from database
router.route('/books').get(function (req, res) {
    db.collection('books').find().toArray(function (err, results) {
        if (err) return console.log(err);
        res.send(results);
    })
})

//retrieve book information from database based on id
router.route('/books/:_id').get(function (req, res) {
    db.collection('books').findOne({ '_id': ObjectId(req.params._id) }, (err,results) => {
        res.send(results);
    })
})

// delete book based on id
router.route('/books/:_id/:token').delete(function (req, res) {
    try {
        var decoded = jwt.verify(req.params.token, secret);
        db.collection('books').deleteOne({ '_id': ObjectId(req.params._id) }, (err,results) => {
            res.send(results);
        });
    } catch (error) {
        res.send({result: 'invalid token'})
    }
});

// update books information based on id
router.route('/books/:_id').put(function (req, res) {
    try {
        var decoded = jwt.verify(req.body.token, secret);
        db.collection('books').updateOne({ "_id": ObjectId(req.params._id) }, {
            $set: {
                'name': req.body.name,
                'author': req.body.author,
                'synopsis': req.body.synopsis
            }
        }, (err, results) => {
            res.send(results);
        });
    } catch (error) {
        res.send({result: 'invalid token'})
    }
});

// creating a route '/loginUser' to validate the username and password with MongoDB and to return the user's role and login if successful
router.route('/loginUser').post(function (req, res2) {
    var username = req.body.username;
    var pw = req.body.password;
    db.collection('users').findOne({ 'name': username }, function (err, result) {
        if (result == null) {
            res2.send([{ 'login': false }]);
        } else {
            bcrypt.compare(pw, result.password, function (err, res) {
                if (err || res == false) {
                    res2.send([{ 'login': false }]);
                } else {
                    var token = jwt.sign({ "username": username }, secret, { expiresIn: '1h' }); // set a variable called token that allow user to autheticate to the website for a certain period of time. 
                    console.log(token);
                    res2.send([{ 'login': true, 'role': result.role, 'token': token }]);
                    
                }
            });
        }
    });
});

//creating a function 

//creaing a route '/registerUser' to store the username and password into MongoDb
router.route('/registerUser').post(function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var role = req.body.role;
    db.collection('users').findOne({ 'name': username }, function (err, result) {
        if (result == null) {
            bcrypt.hash(password, BCRYPT_SALT_ROUNDS, function (err, hash) {
                db.collection('users').insertOne({ 'name': username, 'password': hash, 'role': role }, (err, result) => {
                    if (err) {
                        return console.log(err)
                    } else {
                        console.log('User has been registered.')
                        res.send({"userAdded": true});
                    }
                });
            });
        } else {
            res.send({"userAdded": false})
        }
    })
})

//creating a route to comment on book based on the id
router.route('/comments').post(function (req, res) {
    try {
        var decoded = jwt.verify(req.body.token, secret);
        doc = {
            'comment': req.body.comment,
            'bookId': req.body.bookId
        }
        db.collection('comments').insertOne(doc, (err, results) => {
            if (err) return console.log(err);
            console.log('saved to database');
            res.send(results);
        })
    } catch (error) {
        res.send({result: 'invalid token'})
    }
})

//creating a route to find and display comments based on Id
router.route('/comments/:bookId').get(function (req, res) {
    db.collection('comments').find({'bookId':req.params.bookId}).toArray((err, results) => {
        if (err) return console.log(err);
        res.send(results);
    })
})

module.exports = router;
