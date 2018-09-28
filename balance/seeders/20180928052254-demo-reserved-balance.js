'use strict';// eslint-disable-line

import R from 'ramda';
import casual from 'casual';

const Chance = require('chance');

const helperChance = new Chance();

export async function up(queryInterface) {
  await queryInterface.bulkInsert('ReservedBalance', R.map(index => ({
    account: helperChance.integer({ min: 1, max: 11 }),
    context: casual.sentence,
    balance: helperChance.integer({ min: 50, max: 500 }) + index,
  }))(R.range(1, 6)));

  await queryInterface.bulkInsert('ReservedBalance', R.map(index => ({
    account: helperChance.integer({ min: 1, max: 11 }),
    context: casual.sentence,
    balance: helperChance.integer({ min: 50, max: 500 }) + index,
  }))(R.range(1, 5)));

  await queryInterface.bulkInsert('ReservedBalance', R.map(index => ({
    account: helperChance.integer({ min: 1, max: 11 }),
    context: casual.sentence,
    balance: helperChance.integer({ min: 50, max: 500 }) + index,
  }))(R.range(1, 5)));

  await queryInterface.bulkInsert('ReservedBalance', R.map(index => ({
    account: helperChance.integer({ min: 1, max: 11 }),
    context: casual.sentence,
    balance: helperChance.integer({ min: 50, max: 500 }) + index,
  }))(R.range(1, 5)));

  await queryInterface.bulkInsert('ReservedBalance', R.map(index => ({
    account: helperChance.integer({ min: 1, max: 11 }),
    context: casual.sentence,
    balance: helperChance.integer({ min: 50, max: 500 }) + index,
  }))(R.range(1, 5)));

  await queryInterface.bulkInsert('ReservedBalance', R.map(index => ({
    account: helperChance.integer({ min: 1, max: 11 }),
    context: casual.sentence,
    balance: helperChance.integer({ min: 50, max: 500 }) + index,
  }))(R.range(1, 5)));

  await queryInterface.bulkInsert('ReservedBalance', R.map(index => ({
    account: helperChance.integer({ min: 1, max: 11 }),
    context: casual.sentence,
    balance: helperChance.integer({ min: 50, max: 500 }) + index,
  }))(R.range(1, 5)));
}

export async function down(queryInterface) {
  return queryInterface.bulkDelete('ReservedBalance', null, {});
}
