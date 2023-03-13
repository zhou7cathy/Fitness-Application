const User = require("./user");
const Workout = require("./workout");
const Exercise = require("./exercise");
const WorkoutExercise = require("./workout_exercise");

// Define Associations
Workout.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Workout, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Exercise.belongsToMany(Workout, {
  through: { model: WorkoutExercise },
});

Workout.belongsToMany(Exercise, {
  through: { model: WorkoutExercise },
});

module.exports = {
  User,
  Workout,
  Exercise,
  WorkoutExercise,
};