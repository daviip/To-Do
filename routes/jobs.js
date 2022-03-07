var express = require('express');
var router = express.Router();
const Job = require('../models/Job')
const User = require('../models/User')


router.get('/all', function (req, res, next) {
  Job.find()
    .then(jobs => {
      res.json(jobs);
    })
    .catch(e => {
      console.log(e)
    })
});

router.post('/all/:id', function (req, res) {
  const { id } = req.params;
  Job.find({ user: id }).sort('-creationdate').exec(function (err, jobs) {
      if (err) return res.status(500).send(err);
      res.json(jobs);
  })
})

router.post('/add', function (req, res, next) {
  const { name, userId } = req.body;
  User.findById(userId, (err, u) => {
    let job = new Job({
      user: userId,
      name
    });
    u.jobs.push(job);
    u.save(function (err) {
      if (err) return res.status(500).send(err);
      job.save(function (err) {
        if (err) return res.status(500).send(err);
        res.send('Job added');
      })
    });
  })
})

router.put('/:id', function (req, res) {
  const { id } = req.params;
  const { name } = req.body;
  Job.findByIdAndUpdate(id, {
    name
  }, (err, job) => {
    if (err) return res.status(500).send(err);
    res.send('Job updated');
  })
})

router.put('/done/:id', function (req, res) {
  const { id } = req.params;
  const { name } = req.body;
  Job.findByIdAndUpdate(id, {
    done: true
  }, (err, job) => {
    if (err) return res.status(500).send(err);
    res.send('Job done!');
  })
})

router.delete('/:id', function (req, res) {
  const { id } = req.params;
  Job.findByIdAndDelete(id, (err, job) => {
    if (err) return res.status(500).send(err);
    User.findOneAndUpdate(id, { $pull: { jobs: job._id } }, function (err, jobs) {
      if (err) return res.status(500).send(err);
      res.send('Job deleted');
    })
  })
})

router.put('/all/:id', function (req, res, next) {
  const { id } = req.params;
  const { jobs } = req.body;
  User.findByIdAndUpdate(id, {
    jobs: []
  }, (err, user) => {
    if (err) return res.status(500).send(err);
    res.send(`User ${ user.name } deleted all jobs`);
  })
});


module.exports = router;
