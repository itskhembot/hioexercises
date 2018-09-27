import R from 'ramda';

const Chance = require('chance');

const helperChance = new Chance();

export async function up(queryInterface) {
  const balance = helperChance.integer({ min: 50, max: 500 });
  const availableBalance = helperChance.integer({ min: 50, max: 1000 });

  await queryInterface.bulkInsert('Account', R.map(index => ({
    id: index,
    balance,
    availableBalance,
  }))(R.range(1, 6)));

  await queryInterface.bulkInsert('Account', R.map(index => ({
    id: index,
    balance,
    availableBalance,
  }))(R.range(1, 5)));

  await queryInterface.bulkInsert('Account', R.map(index => ({
    id: index,
    balance,
    availableBalance,
  }))(R.range(1, 5)));

  await queryInterface.bulkInsert('Account', R.map(index => ({
    id: index,
    balance,
    availableBalance,
  }))(R.range(1, 5)));

  await queryInterface.bulkInsert('Account', R.map(index => ({
    id: index,
    balance,
    availableBalance,
  }))(R.range(1, 5)));

  await queryInterface.bulkInsert('Account', R.map(index => ({
    id: index,
    balance,
    availableBalance,
  }))(R.range(1, 5)));

  await queryInterface.bulkInsert('Account', R.map(index => ({
    id: index,
    balance,
    availableBalance,
  }))(R.range(1, 5)));

  await queryInterface.bulkInsert('Account', R.map(index => ({
    id: index,
    balance,
    availableBalance,
  }))(R.range(1, 5)));

  await queryInterface.bulkInsert('Account', R.map(index => ({
    id: index,
    balance,
    availableBalance,
  }))(R.range(1, 5)));

  await queryInterface.bulkInsert('Account', R.map(index => ({
    id: index,
    balance,
    availableBalance,
  }))(R.range(1, 5)));

  await queryInterface.bulkInsert('Account', R.map(index => ({
    id: index,
    balance,
    availableBalance,
  }))(R.range(1, 5)));

  await queryInterface.bulkInsert('Account', R.map(index => ({
    id: index,
    balance,
    availableBalance,
  }))(R.range(1, 5)));

  await queryInterface.bulkInsert('Account', R.map(index => ({
    id: index,
    balance,
    availableBalance,
  }))(R.range(1, 5)));

  await queryInterface.bulkInsert('Account', R.map(index => ({
    id: index,
    balance,
    availableBalance,
  }))(R.range(1, 5)));

  await queryInterface.bulkInsert('Account', R.map(index => ({
    id: index,
    balance,
    availableBalance,
  }))(R.range(1, 5)));
}

export async function down() {} // eslint-disable-line