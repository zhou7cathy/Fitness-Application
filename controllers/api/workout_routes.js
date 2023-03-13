const router = require('express').Router();
const { WorkoutExercise, Workout } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/exercise', withAuth, async (req, res) => {
  try {
    const newWorkout = await Workout.create({
      complete_date: new Date(),
      user_id: req.session.user_id,
    });
    for(let i = 0; i < req.body.length; i++) { 
      const newWorkoutExercise = await WorkoutExercise.create({
        workout_id: newWorkout.id,
        exercise_id: req.body[i].exerciseId,
        exercise_time: req.body[i].exerciseTime
      })
    }

    res.status(200).json('good');
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;