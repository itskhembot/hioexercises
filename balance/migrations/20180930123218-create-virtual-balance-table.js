'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('VirtualBalance', {
    id: {
      type: Sequelize.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    account: Sequelize.Sequelize.INTEGER,
    context: Sequelize.Sequelize.STRING,
    balance: Sequelize.Sequelize.DOUBLE,
    isCommit: Sequelize.Sequelize.BOOLEAN,
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('VirtualBalance');
}
