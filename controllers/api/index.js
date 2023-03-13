const router = require('express').Router();

const userRoutes = require('./user_routes');
const chartRoute = require('./graph_routes');
const workoutRoute = require('./workout_routes');
const questionRoute = require('./question_routes');

router.use('/user', userRoutes);
router.use('/matrix', chartRoute);
router.use('/workout', workoutRoute);
router.use('/form', questionRoute);

module.exports = router;