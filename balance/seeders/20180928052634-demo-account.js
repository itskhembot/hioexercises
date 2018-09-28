'use strict';// eslint-disable-line

import R from 'ramda';

const Chance = require('chance');

const helperChance = new Chance();

export async function up(queryInterface) {
  await queryInterface.bulkInsert('Account', R.map(index => ({
    balance: helperChance.integer({ min: 50, max: 500 }),
    availableBalance: helperChance.integer({ min: 50, max: 1000 }) + index,
  }))(R.range(1, 5)));

  await queryInterface.bulkInsert('Account', R.map(index => ({
    balance: helperChance.integer({ min: 50, max: 500 }),
    availableBalance: helperChance.integer({ min: 50, max: 1000 }) + index,
  }))(R.range(1, 5)));

  await queryInterface.bulkInsert('Account', R.map(index => ({
    balance: helperChance.integer({ min: 50, max: 500 }),
    availableBalance: helperChance.integer({ min: 50, max: 1000 }) + index,
  }))(R.range(1, 5)));

  await queryInterface.bulkInsert('Account', R.map(index => ({
    balance: helperChance.integer({ min: 50, max: 500 }),
    availableBalance: helperChance.integer({ min: 50, max: 1000 }) + index,
  }))(R.range(1, 5)));

  await queryInterface.bulkInsert('Account', R.map(index => ({
    balance: helperChance.integer({ min: 50, max: 500 }),
    availableBalance: helperChance.integer({ min: 50, max: 1000 }) + index,
  }))(R.range(1, 5)));

  await queryInterface.bulkInsert('Account', R.map(index => ({
    balance: helperChance.integer({ min: 50, max: 500 }),
    availableBalance: helperChance.integer({ min: 50, max: 1000 }) + index,
  }))(R.range(1, 5)));

  await queryInterface.bulkInsert('Account', R.map(index => ({
    balance: helperChance.integer({ min: 50, max: 500 }),
    availableBalance: helperChance.integer({ min: 50, max: 1000 }) + index,
  }))(R.range(1, 5)));

  await queryInterface.bulkInsert('Account', R.map(index => ({
    balance: helperChance.integer({ min: 50, max: 500 }),
    availableBalance: helperChance.integer({ min: 50, max: 1000 }) + index,
  }))(R.range(1, 5)));

  await queryInterface.bulkInsert('Account', R.map(index => ({
    balance: helperChance.integer({ min: 50, max: 500 }),
    availableBalance: helperChance.integer({ min: 50, max: 1000 }) + index,
  }))(R.range(1, 5)));

  await queryInterface.bulkInsert('Account', R.map(index => ({
    balance: helperChance.integer({ min: 50, max: 500 }),
    availableBalance: helperChance.integer({ min: 50, max: 1000 }) + index,
  }))(R.range(1, 5)));
}

export async function down(queryInterface) {
  return queryInterface.bulkDelete('Account', null, {});
}
