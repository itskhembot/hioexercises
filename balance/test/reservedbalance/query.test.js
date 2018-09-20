import test from 'ava';
import ReservedBalanceModel from '../../src/models/reserved-balance';
const url = `http://localhost:4000/`;
const request = require('supertest')(url);
const Chance = require('chance'),
  chance = new Chance();

test('query reservedBalance', async (t) => {
  const reservedBalanceId = chance.integer({ min: 1, max: 2 });
  const reservedBalance = await ReservedBalanceModel.findOne({ where: { id: reservedBalanceId }, raw: true });
  const { body } = await request
    .post('/graphql')
    .send({
      query: `
      query($id: ID!)  {
        reservedBalance(id: $id) {
            id
            account
            context
            balance
        }
      }
      `,
      variables: {
        id: reservedBalanceId
      },
    })
    .expect(200);

  t.deepEqual(body.data.reservedBalance.balance, reservedBalance.balance);
  t.deepEqual(body.data.reservedBalance.context, reservedBalance.context);
  t.deepEqual(body.data.reservedBalance.account, reservedBalance.account);
  t.deepEqual(body.data.reservedBalance.id, reservedBalance.id.toString());
});

test('query reservedBalances', async (t) => {
  const accountId = chance.integer({ min: 1, max: 2 });
  const reservedBalances = await ReservedBalanceModel.findAll({ where: { account: accountId }, raw: true,attributes: { exclude: ['id', 'isReleased'] } });
  const { body } = await request
    .post('/graphql')
    .send({
      query: `
        query($id: ID!)  {
          reservedBalances(account: $id) {
              account
              context
              balance
          }
        }
        `,
      variables: {
        id: accountId
      },
    })
    .expect(200);
  //t.deepEqual(body.data.reservedBalances[0][0], reservedBalances[0][0]);
  t.deepEqual(body.data.reservedBalances,reservedBalances);
});

