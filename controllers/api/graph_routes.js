const router = require('express').Router();
const withAuth = require('../../utils/auth');
const moment = require('moment');
const { Op, Sequelize } = require('sequelize');
const { Workout, Exercise, WorkoutExercise, User } = require('../../models');


router.get('/chart', withAuth, async (req, res) => {
  const startDate = moment().startOf('week').toDate();
  const endDate = moment().endOf('week').toDate();
  try{
    // Get all workout and exercises did in that workout between a certain date range
    const workoutData = await Workout.findAll({
      where: {
        user_id: req.session.user_id,
        complete_date: {
          [Op.between]: [startDate, endDate]
        }
      },
      include: [
        {
          model: Exercise
        },
      ],
    });
    const workouts = workoutData.map((workout) => workout.get({ plain: true }));

    // For each workout, we add all exercise time and store it on each workout object for future use
    workouts.forEach(workout => {
      workout.exercise_time = 0;
      workout.exercises.forEach(exercise => {
        workout.exercise_time += exercise.workout_exercise.exercise_time;
      })
    });

    // BUild the label within array starts from the start of the week
    let labels = [moment(startDate).format("YYYY-MM-DD")];
    for (let i = 0; i < 5; i++) {
      const tempDate = new Date(startDate);
      tempDate.setDate(tempDate.getDate() + (i+1));
      labels.push(moment(tempDate).format("YYYY-MM-DD"));
    }
    labels.push(moment(endDate).format("YYYY-MM-DD"));

    // Data contains the total number of exercise mins for each date in the week;
    let data = [];

    // For eac label(date)
    labels.forEach((date, index) => {
      // Find all workouts on this date
      const allWorkoutOnThatDate = workouts.filter((workout) => workout.complete_date.getDate() == new Date(date).getDate())
      
      // Set a temp variable to store the exercise mins
      let totalWorkoutTimeOnThatDate = 0;

      // For each workout on this date, we add up all exercise_time of each workout
      allWorkoutOnThatDate.forEach((ele) => {
        totalWorkoutTimeOnThatDate += ele.exercise_time;
      })

      // Push the total number of exercise mins on the date to data array
      data.push(totalWorkoutTimeOnThatDate);
    })

    const chartData = {
      labels,
      datasets: [
        {
          label: 'Total exercises time of the day',
          data,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };


    res.json(chartData);
  }
  catch (err) {
    res.status(400).json(err);
  }
});


router.get('/trends', async (req, res) => {
  const startDate = moment().startOf('week').toDate();
  const endDate = moment().endOf('week').toDate();
  try {
    // Select from Exercise table to Workout table while joint table Workout_exercise
    // This will group all workout_exercise by Exercise
    const WorkoutExerciseData = await Exercise.findAll({
      include: [
        {
          model: Workout,
          where: {
            complete_date: {
              [Op.between]: [startDate, endDate]
            }
          },
        },
      ],
    });
    const exercises = WorkoutExerciseData.map((exercise) => exercise.get({ plain: true }));

     // For each exercise, we add all exercise time under workout_exercise object and store it on each exercise object for future use
     exercises.forEach(exercise => {
      exercise.total_exercise_time = 0;
      exercise.workouts.forEach(workout => {
        exercise.total_exercise_time += workout.workout_exercise.exercise_time;
      })
    });
    const sortedExercises = exercises.sort((a, b) => b.total_exercise_time - a.total_exercise_time);
    const topThreeExercise=sortedExercises.slice(0,3)

    res.json(topThreeExercise);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
