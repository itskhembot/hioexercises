'use strict';// eslint-disable-line

export async function up(queryInterface, Sequelize) {// eslint-disable-line
  await queryInterface.addConstraint('ReservedBalance', ['account', 'context'], {
    type: 'unique',
    name: 'account-context-constraint',
  });
  await queryInterface.addConstraint('VirtualBalance', ['account', 'context'], {
    type: 'unique',
    name: 'account-context-constraint',
  });
}

export async function down(queryInterface) {// eslint-disable-line
}
