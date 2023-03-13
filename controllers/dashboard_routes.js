const router = require('express').Router();
const { User, Workout, Exercise } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const workoutData = await Workout.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: Exercise
        },
      ],
    });

    // Serialize data so the template can read it
    const workouts = workoutData.map((workout) => workout.get({ plain: true }));
   
    workouts.forEach(workout => {
      workout.exercise_name = '';
      workout.exercise_time = 0;
      workout.exercises.forEach(exercise => {
        workout.exercise_name += exercise.exercise_name + ' ';
        workout.exercise_time += exercise.workout_exercise.exercise_time;
      })
    });


    // Pass serialized data and session flag into template
    res.render('workout', { 
      layout: "dashboard",
      workouts: workouts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/workout', withAuth, async (req, res) => {
  try {
    const workoutData = await Workout.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: Exercise
        },
      ],
    });

    // Serialize data so the template can read it
    const workouts = workoutData.map((workout) => workout.get({ plain: true }));
    workouts.forEach(workout => {
      workout.exercise_name = '';
      workout.exercise_time = 0;
      workout.exercises.forEach(exercise => {
        workout.exercise_name += exercise.exercise_name + ' ';
        workout.exercise_time += exercise.workout_exercise.exercise_time;
      })
    });


    // Pass serialized data and session flag into template
    res.render('workout', { 
      layout: "dashboard",
      workouts: workouts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// User sign up
router.get('/signup', (req, res) => {

  res.render('signup');
});

router.get('/account', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id);

    const accountData = userData.get({ plain: true });


    res.render('account', { 
      layout: "dashboard",
      ...accountData,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/matrix', withAuth, (req, res) => {
 
  res.render('chart', { 
    layout: "dashboard",
    logged_in: req.session.logged_in 
  });
});

router.get('/exercise', withAuth, async(req, res) => {
 
  try {
    const exerciseData = await Exercise.findAll();

    const exercises = exerciseData.map((exercise) => exercise.get({ plain: true }));

    
    res.render('trackActivity', { 
      layout: "dashboard",
      exercises: exercises ,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



// GET route for the question forms page
router.get('/questionforms', withAuth, (req, res) => {

  const fitnessQuestions = [
    {
      question: "What is your gender?",
      type: "radio",
      name: "gender",
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" }
      ],
      required: true
    },
    {
      question: "What is your current height in centimeters?",
      type: "number",
      name: "height",
      placeholder: "Enter your height in centimeters",
      required: true
    },
    {
      question: "What is your current weight in kilograms?",
      type: "number",
      name: "weight",
      placeholder: "Enter your weight in kilograms",
      required: true
    }
  ];

  res.render('questionforms', {
    layout: "dashboard",
    title: 'Question Forms',
    questions: fitnessQuestions,
  });
});
module.exports = router;