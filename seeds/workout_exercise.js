const { WorkoutExercise } = require('../models');

const workoutExerciseTagData = [
  {
    workout_id:1,
    exercise_id: 1,
    exercise_time: 50,
  },
  {
    workout_id:1,
    exercise_id: 2,
    exercise_time: 30,
  },  
  {
    workout_id:1,
    exercise_id: 3,
    exercise_time: 10,
  },  
  {
    workout_id:2,
    exercise_id: 1,
    exercise_time: 20,
  },
  {
    workout_id:2,
    exercise_id: 3,
    exercise_time: 90,
  },  
  {
    workout_id:2,
    exercise_id: 5,
    exercise_time: 30,
  }, 
  {
    workout_id:3,
    exercise_id: 3,
    exercise_time: 90,
  },  
  {
    workout_id:4,
    exercise_id: 5,
    exercise_time: 30,
  }, 
];

const seedWorkoutExercise = () => WorkoutExercise.bulkCreate(workoutExerciseTagData);

module.exports = seedWorkoutExercise;