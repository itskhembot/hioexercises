import test from 'ava';
import VirtualBalanceModel from '../../src/models/virtual-balance';

const url = 'http://localhost:4000/';
const request = require('supertest')(url);
const Chance = require('chance');

const helperChance = new Chance();

test('query virtualBalance', async (t) => {
  const virtualBalanceId = helperChance.integer({ min: 1, max: 2 });
  const virtualBalance = await VirtualBalanceModel.findOne(
    { where: { id: virtualBalanceId }, raw: true },
  );
  const { body } = await request
    .post('/graphql')
    .send({
      query: `
      query($id: ID!)  {
        virtualBalance(id: $id) {
            id
            account
            context
            balance
        }
      }
      `,
      variables: {
        id: virtualBalanceId,
      },
    })
    .expect(200);

  t.deepEqual(body.data.virtualBalance.balance, virtualBalance.balance);
  t.deepEqual(body.data.virtualBalance.context, virtualBalance.context);
  t.deepEqual(body.data.virtualBalance.account, virtualBalance.account);
  t.deepEqual(body.data.virtualBalance.id, virtualBalance.id.toString());
});

test('query virtualBalances', async (t) => {
  const accountId = helperChance.integer({ min: 1, max: 2 });
  const virtualBalances = await VirtualBalanceModel.findAll(
    { where: { account: accountId }, raw: true, attributes: { exclude: ['id', 'isCommit'] } },
  );
  const { body } = await request
    .post('/graphql')
    .send({
      query: `
        query($id: ID!)  {
          virtualBalances(account: $id) {
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
  //  t.deepEqual(body.data.VirtualBalances[0][0], VirtualBalances[0][0]);
  t.deepEqual(body.data.virtualBalances, virtualBalances);
});
