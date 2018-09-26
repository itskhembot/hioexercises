import supertest from 'supertest';
import test from 'ava';
import server from '../../src/index';
import AccountModel from '../../src/models/account';

let superserver;
const Chance = require('chance');

const helperChance = new Chance();
const port = helperChance.integer({ max: 9000, min: 5000 });
test.before(async () => {
  superserver = supertest(await server.start(port));
});

test('query account', async (t) => {
  const accountId = helperChance.integer({ min: 1, max: 3 });
  const account = await AccountModel.findOne({ where: { id: accountId }, raw: true });
  const { body } = await superserver
    .post('/graphql')
    .send({
      query: `
      query($id: ID!)  {
        account(id: $id) {
          id
          balance
          availableBalance
        }
      }
      `,
      variables: {
        id: accountId,
      },
    })
    .expect(200);

  account.id = account.id.toString();
  t.deepEqual(body.data.account, account);
});

test.after(async () => {
  await server.stop();
});
