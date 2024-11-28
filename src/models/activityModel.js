module.exports = (sequelize, DataTypes) => {
    const Activity = sequelize.define('Activity', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      accessCode: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  
    Activity.associate = (models) => {
      Activity.hasMany(models.Feedback, { foreignKey: 'activityId' });
    };
  
    return Activity;
  };
  