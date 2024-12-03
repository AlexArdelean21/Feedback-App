'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    static associate(models) {
      Activity.hasMany(models.Feedback, {
        foreignKey: 'activityId',
        onDelete: 'CASCADE',
      });
    }
  }

  Activity.init(
    {
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Description cannot be empty',
          },
        },
      },
      accessCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: {
            msg: 'Start time must be a valid date',
          },
        },
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: {
            msg: 'End time must be a valid date',
          },
          isAfterStartTime(value) {
            if (this.startTime && value <= this.startTime) {
              throw new Error('End time must be after start time');
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Activity',
    }
  );

  return Activity;
};
