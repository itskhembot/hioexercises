'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Request', {
    id: {
      type: Sequelize.Sequelize.STRING,
      primaryKey: true,
      autoIncrement: false,
    },
    result: Sequelize.Sequelize.JSON,
    error: Sequelize.Sequelize.JSON,
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('Request');
}
