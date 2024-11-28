module.exports = (sequelize, DataTypes) => {
    const Feedback = sequelize.define('Feedback', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      emotion: {
        type: DataTypes.ENUM('smiley', 'frowny', 'surprised', 'confused'),
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  
    Feedback.associate = (models) => {
      Feedback.belongsTo(models.Activity, { foreignKey: 'activityId' });
    };
  
    return Feedback;
  };
  