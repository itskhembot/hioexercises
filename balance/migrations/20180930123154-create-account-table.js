'use strict';// eslint-disable-line

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Account', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    balance: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    availableBalance: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('Account');
}
