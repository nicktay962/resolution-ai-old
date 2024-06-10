const router = require('express').Router();
let Program = require('../models/program.model');

router.route('/').get((req, res) => {
  Program.find()
    .then(programs => res.json(programs))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const goal = req.body.goal;
  const price = req.body.price;
  const timeToComplete = req.body.timeToComplete;
  const timeUnit = req.body.timeUnit;
  const activities = req.body.activities;

  const newProgram = new Program({
    goal,
    price,
    timeToComplete,
    timeUnit,
    activities,
  });

  newProgram.save()
    .then(() => res.json('Program added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
