import R from 'ramda';
import casual from 'casual';

const Chance = require('chance');

const helperChance = new Chance();

export async function up(queryInterface) {
  const account = helperChance.integer({ min: 1, max: 15 });
  const balance = helperChance.integer({ min: 50, max: 500 });
  const context = casual.sentence;

  await queryInterface.bulkInsert('ReservedBalance', R.map(index => ({
    id: index,
    account,
    context,
    balance,
  }))(R.range(1, 6)));

  await queryInterface.bulkInsert('ReservedBalance', R.map(index => ({
    id: index,
    account,
    context,
    balance,
  }))(R.range(1, 5)));

  await queryInterface.bulkInsert('ReservedBalance', R.map(index => ({
    id: index,
    account,
    context,
    balance,
  }))(R.range(1, 5)));

  await queryInterface.bulkInsert('ReservedBalance', R.map(index => ({
    id: index,
    account,
    context,
    balance,
  }))(R.range(1, 5)));

  await queryInterface.bulkInsert('ReservedBalance', R.map(index => ({
    id: index,
    account,
    context,
    balance,
  }))(R.range(1, 5)));

  await queryInterface.bulkInsert('ReservedBalance', R.map(index => ({
    id: index,
    account,
    context,
    balance,
  }))(R.range(1, 5)));

  await queryInterface.bulkInsert('ReservedBalance', R.map(index => ({
    id: index,
    account,
    context,
    balance,
  }))(R.range(1, 5)));

  await queryInterface.bulkInsert('ReservedBalance', R.map(index => ({
    id: index,
    account,
    context,
    balance,
  }))(R.range(1, 5)));

  await queryInterface.bulkInsert('ReservedBalance', R.map(index => ({
    id: index,
    account,
    context,
    balance,
  }))(R.range(1, 5)));

  await queryInterface.bulkInsert('ReservedBalance', R.map(index => ({
    id: index,
    account,
    context,
    balance,
  }))(R.range(1, 5)));

  await queryInterface.bulkInsert('ReservedBalance', R.map(index => ({
    id: index,
    account,
    context,
    balance,
  }))(R.range(1, 5)));

  await queryInterface.bulkInsert('ReservedBalance', R.map(index => ({
    id: index,
    account,
    context,
    balance,
  }))(R.range(1, 5)));

  await queryInterface.bulkInsert('ReservedBalance', R.map(index => ({
    id: index,
    account,
    context,
    balance,
  }))(R.range(1, 5)));

  await queryInterface.bulkInsert('ReservedBalance', R.map(index => ({
    id: index,
    account,
    context,
    balance,
  }))(R.range(1, 5)));

  await queryInterface.bulkInsert('ReservedBalance', R.map(index => ({
    id: index,
    account,
    context,
    balance,
  }))(R.range(1, 5)));
}

export async function down() {} // eslint-disable-line