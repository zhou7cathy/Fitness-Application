const { Workout } = require('../models');

const workoutData = [
  {
    "complete_date": "3/12/23",
    "user_id": 1
  },
  {
    "complete_date": "3/12/23",
    "user_id": 2
  },
  {
    "complete_date": "3/13/23",
    "user_id": 1
  },
  {
    "complete_date": "3/13/23",
    "user_id": 2
  },
];

const seedWorkouts = () => Workout.bulkCreate(workoutData);

module.exports = seedWorkouts;