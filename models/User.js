const Job = require('../models/Job');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;

const UserShema = new Schema({
    name: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true},
    email: {type: String, required: true},
    creationdate: {type: Date, default: Date.now}
})

UserShema.pre('save', function(next){
    let user = this;
    if(!user.isModified('password ')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);
        bcrypt.hash(user.password, salt, function(err, encryptedPass){
            if(err) return next(err);
            user.password = encryptedPass;
            next();
        })
    })

})

UserShema.methods.comparePassword = function(pass, cb){
    bcrypt.compare(pass, this.password, function(err, next){
        if(err) return cb(err);
        cb(null, next);
    })
}

module.exports = mongoose.model('User',UserShema);