import test from 'ava';
//import AccountModel from '../../models/account';
const url = `http://localhost:4000/`;
const request = require('supertest')(url);
const Chance = require('chance'),
chance = new Chance();

const Sequelize = require('sequelize');
const sequelize = new Sequelize('balance', 'postgres', 'yuadnat', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

});
const AccountModel = sequelize.define('Account', {
  id: {
    type: sequelize.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  balance: sequelize.Sequelize.DOUBLE,
  availableBalance: sequelize.Sequelize.DOUBLE,
}, { tableName: 'Account', freezeTableName: true, timestamps: false });

test('query account', async (t) => {
  const accountId = chance.integer({ max: 3, min: 1 });
  const account = await AccountModel.findOne({ where: { id: 1 } ,raw: true});
  const { body  } = await request
    .post('/graphql')
    .send({
      query: `
      query  {
        account(id: 1) {
          id
          balance
          availableBalance
        }
      }
      `,
      variables: {
        accountId: {
          accountId
        },
      },
    })
    .expect(200);

  //t.pass();
  //t.deepEqual(body.data.account.balance, account.balance);
  //t.deepEqual(body.data.account.availableBalance, account.availableBalance);
  t.deepEqual(body.data.account, account);
});

