const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const User = require('../models/User');

const PostSchema = new Schema({
    name: {type: String,  required: true},
    creationdate: {type: Date, default: Date.now},
    done: {type: Boolean, default: false},
});

module.exports = model('Post', PostSchema);