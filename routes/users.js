var express = require('express');
const { insertMany } = require('../models/User');
var router = express.Router();
const Job = require('../models/Job');
const User = require('../models/User');
var bcrypt = require('bcryptjs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
