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

module.exports = model('Job', JobSchema);