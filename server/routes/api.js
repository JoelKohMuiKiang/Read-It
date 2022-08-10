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
const e = require('express');

//declaring and initializing a BCRYPT_SALT_ROUND constant to add salt to the hashing (Salts help to create unique passwords even if passwords from different users are different)
const BCRYPT_SALT_ROUNDS = 12;

var db;
MongoClient.connect('mongodb+srv://JoeJoe:Password@readit.4g2rw.mongodb.net/readItData?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, database) => {
    if (err) return console.log(err);
    db = database.db('readItData');
});

// add new book into database
router.route('/books').post(function (req, res) {
    db.collection('books').insertOne(req.body, (err, results) => {
        if (err) return console.log(err);
        console.log('saved to database');
        res.send(results);
    })
})

// retrieve book information from database
router.route('/books').get(function (req, res) {
    db.collection('books').find().toArray(function (err, results) {
        if (err) return console.log(err);
        res.send(results);
    })
})

//retrieve book information from database based on id
router.route('/books/:id').get(function (req, res) {
    db.collection('books').findOne({'_id': ObjectId(req.params._id) }, (err,
        results) => {
            res.send(results);
        })
})

// delete book based on id
router.route('/books/:_id').delete(function (req, res) {
    db.collection('books').deleteOne({ '_id': ObjectId(req.params._id) }, (err,
        results) => {
        res.send(results);
    });
});

// update books information based on id
router.route('/books/:_id').put(function (req, res) {
    db.collection('books').updateOne({ "_id": ObjectId(req.params._id) }, {
        $set: req.body
    }, (err, results) => {
        res.send(results);
    });
});

// creating a route '/loginUser' to validate the username and password with MongoDB and to return the user's role and login if successful
router.route('/loginUser').post(function(req, res2) {
    var username = req.body.username;
    var password = req.body.password;
    db.collection('users').findOne({'name': username}, {password: 1, role: 1, _id: 0}, function(err, result) {
        if (result == null) res2.send([{'login': false}]);
        else {
            bcrypt.compare(password, result.password, function(err, res) {
                if(err || res == false) {
                    res2.send([{'login': false}]);
                } else {
                    res2.send([{'login': true, 'role': result.role}]);
                }
            });
        }
    });
});

//creaing a route '/registerUser' to store the username and password into MongoDb
router.route('/registerUser').post(function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var role = req.body.role;
    bcrypt.hash(password, BCRYPT_SALT_ROUNDS, function(err, hash) {
        db.collection('users').insertOne({'name': username, 'password': hash, 'role': role}, (err, result) => {
            if (err) return console.log(err)
            console.log('User has been registered.')
            res.send(result);
        });
    });
})

module.exports = router;
