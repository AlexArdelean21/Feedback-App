'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Feedbacks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      emotion: {
        type: Sequelize.STRING
      },
      timestamp: {
        type: Sequelize.DATE
      },
      activityId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  
  emotion: {
    type: Sequelize.ENUM('smiley', 'frowny', 'surprised', 'confused'),
    allowNull: false,
  },

  activityId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Activities',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Feedbacks');
  }
};