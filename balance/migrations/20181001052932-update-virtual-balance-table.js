'use strict';// eslint-disable-line

export async function up(queryInterface, Sequelize) {
  await queryInterface.changeColumn('VirtualBalance', {
    id: {
      type: Sequelize.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    account: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    context: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    balance: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    isCommit: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('VirtualBalance');
}
