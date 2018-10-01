'use strict';// eslint-disable-line

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Account', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    balance: Sequelize.Sequelize.DOUBLE,
    availableBalance: Sequelize.Sequelize.DOUBLE,
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('Account');
}
