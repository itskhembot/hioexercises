'use strict';// eslint-disable-line

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('ReservedBalance', {
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
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    isReleased: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  });
  await queryInterface.addConstraint('ReservedBalance', ['account', 'context'], {
    type: 'unique',
    name: 'account-context-constraint',
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('ReservedBalance');
}
