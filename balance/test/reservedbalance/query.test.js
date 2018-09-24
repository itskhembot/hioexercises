import supertest from 'supertest';
import test from 'ava';
import server from '../../src/index';
import ReservedBalanceModel from '../../src/models/reserved-balance';

let request;
const Chance = require('chance');

const helperChance = new Chance();
const port = helperChance.integer({ max: 9000, min: 5000 });

test.before(async () => {
  request = supertest(await server.start(port));
});

test('query reservedBalance', async (t) => {
  const reservedBalanceId = helperChance.integer({ min: 1, max: 2 });
  const reservedBalance = await ReservedBalanceModel.findOne(
    { where: { id: reservedBalanceId }, raw: true, attributes: { exclude: ['isReleased'] } },
  );
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
        id: reservedBalanceId,
      },
    })
    .expect(200);

  reservedBalance.id = reservedBalance.id.toString();
  t.deepEqual(body.data.reservedBalance, reservedBalance);
});

test('query reservedBalances', async (t) => {
  const accountId = helperChance.integer({ min: 1, max: 2 });
  const reservedBalances = await ReservedBalanceModel.findAll({ where: { account: accountId }, raw: true, attributes: { exclude: ['id', 'isReleased'] } });
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
        id: accountId,
      },
    })
    .expect(200);

  t.deepEqual(body.data.reservedBalances, reservedBalances);
});

test.after(async () => {
  await server.stop();
});
