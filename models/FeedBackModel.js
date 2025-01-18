module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define('Feedback', {
    id: {
      type: DataTypes.INTEGER,
      defaultValue: DataTypes.INTEGER,
      primaryKey: true,
    },
    emotion: {
      type: DataTypes.ENUM('smiley', 'frowny', 'surprised', 'confused'),
      allowNull: false,
      validate: {
        isIn: {
          args: [['smiley', 'frowny', 'surprised', 'confused']],
          msg: 'Emotion must be one of smiley, frowny, surprised, or confused',
        },
      },
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    activityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Activities',
        key: 'id',
      },
    },
  });

  // Associations
  Feedback.associate = (models) => {
    Feedback.belongsTo(models.Activity, { foreignKey: 'activityId' });
  };

  // Utility Method to Fetch Feedback for Activity
  Feedback.getFeedbackForActivity = async function (activityId) {
    return await this.findAll({
      where: {
        activityId,
      },
      order: [['createdAt', 'ASC']],
    });
  };

  return Feedback;
};
