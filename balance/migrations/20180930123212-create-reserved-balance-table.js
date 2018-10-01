'use strict';// eslint-disable-line

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('ReservedBalance', {
    id: {
      type: Sequelize.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    account: Sequelize.Sequelize.INTEGER,
    context: Sequelize.Sequelize.STRING,
    balance: Sequelize.Sequelize.DOUBLE,
    isReleased: Sequelize.Sequelize.BOOLEAN,
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('ReservedBalance');
}
