'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Update the 'timestamp' column to have a default value
    await queryInterface.changeColumn('Feedbacks', 'timestamp', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Rollback the change
    await queryInterface.changeColumn('Feedbacks', 'timestamp', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },
};
