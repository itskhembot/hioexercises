import supertest from 'supertest';
import test from 'ava';
import server from '../../src/index';
import VirtualBalanceModel from '../../src/models/virtual-balance';

let superserver;
const Chance = require('chance');

const helperChance = new Chance();
const port = helperChance.integer({ max: 9000, min: 5000 });

test.before(async () => {
  superserver = supertest(await server.start(port));
});

test('query virtualBalance', async (t) => {
  const virtualBalanceId = helperChance.integer({ min: 1, max: 30 });
  const virtualBalance = await VirtualBalanceModel.findOne(
    { where: { id: virtualBalanceId }, raw: true, attributes: { exclude: ['isCommit'] } },
  );
  const { body } = await superserver
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

  virtualBalance.id = virtualBalance.id.toString();
  t.deepEqual(body.data.virtualBalance, virtualBalance);
});

test('query virtualBalances', async (t) => {
  const accountId = helperChance.integer({ min: 1, max: 10 });
  const virtualBalances = await VirtualBalanceModel.findAll(
    { where: { account: accountId }, raw: true, attributes: { exclude: ['id', 'isCommit'] } },
  );
  const { body } = await superserver
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

  t.deepEqual(body.data.virtualBalances, virtualBalances);
});

test.after(async () => {
  await server.stop();
});
