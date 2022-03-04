var express = require('express');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const User = require('../models/User');
let router = express.Router();


const JobSchema = new Schema({
    user: {type: Schema.ObjectId, ref: 'User', required: true},
    name: {type: String,  required: true},
    creationdate: {type: Date, default: Date.now},
    done: {type: Boolean, default: false},
});

router.post('/add', function (req, res, next) {
    const { name, userId } = req.body;
    User.findById(userId, (err, u) => {
        let job = new Post({
            user: u,
            name
        })
        u.jobs.push(job);
        u.save(function (err) {
            if (err) return res.status(500).send(err);
            post.save(function (err) {
                if (err) return res.status(500).send(err);
                res.send('Job added');
            })
        });
    })
})

module.exports = model('Job', JobSchema);