const sequelize = require('../config/connection');
const seedUsers = require('./user');
const seedExercise = require('./exercise');
const seedWorkouts = require('./workout');
const seedWorkoutExercise = require('./workout_exercise');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();
  await seedExercise();
  await seedWorkouts();
  await seedWorkoutExercise();

  process.exit(0);
};

seedAll();