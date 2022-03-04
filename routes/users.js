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

router.post('/singup', function (req, res, next) {
  if (req.body.lengtg == 0) return;
  const { name, password, email } = req.body;
  console.log(name, password, email);
  User.create({
    name,
    password,
    email
  }, (err, user) => {
    if (err) return res.status(500).send(err);
    // console.log(err);
    res.json(user);
  })
});

// router.put('/:id', function (req, res, next) {
//   const { id } = req.params;
//   const { name, password, email, creationdate } = req.body;
//   User.findByIdAndUpdate(id, {
//     name,
//     password,
//     email,
//     creationdate
//   }, (err, user) => {
//     if (err) return res.status(500).send(err);
//     res.send(`User ${ user.name } updated`);
//   })
// });

// router.delete('/:id', function (req, res, next) {
//   const { id } = req.params;
//   User.findByIdAndDelete(id, (err, user) => {
//     if (err) return res.status(500).send(err);
//     res.send(`User ${ user.name } deleted`);
//   })
// });

// router.post('/singin', function (req, res, next) {
//   const { name, password } = req.body;
//   User.findOne({ name }).then(user => {
//     if (!user) return res.status(404).send("User not found");

//     user.comparePassword(password, (err, isMatch) => {
//       if (err) return res.status(500).send(err);
//       if (!isMatch) return res.status(401).send("Incorrect password");

//       User.findOne({ name }).then(user => {
//         res.json(user);
//       })
//     })
//   })
// });

module.exports = router;
