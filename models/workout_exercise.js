const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class WorkoutExercise extends Model {}

WorkoutExercise.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    exercise_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    exercise_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'exercise',
        key: 'id',
      },
    },
    workout_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'workout',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'workout_exercise',
  }
);

module.exports = WorkoutExercise;

 