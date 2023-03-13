const { Exercise } = require('../models');

const exerciseData = [
  {
    "exercise_name": "Running",
  },
  {
    "exercise_name": "Cycling",
  },
  {
    "exercise_name": "Squats",
  },
  {
    "exercise_name": "Push-ups",
  },
  {
    "exercise_name": "Lunges",
  },
  {
    "exercise_name": "Situps",
  },
  {
    "exercise_name": "Yoga",
  },
  {
    "exercise_name": "Swimming",
  },     
];

const seedExercise = () => Exercise.bulkCreate(exerciseData);
module.exports = seedExercise;