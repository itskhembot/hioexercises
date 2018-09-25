import supertest from 'supertest';
import test from 'ava';
import uuid from 'uuid';
import server from '../../src/index';

let request;
const Chance = require('chance');

const helperChance = new Chance();
const port = helperChance.integer({ max: 9000, min: 5000 });
test.before(async () => {
  request = supertest(await server.start(port));
});

test('update balance', async (t) => {
  const accountId = helperChance.integer({ min: 1, max: 3 });
  const balance = helperChance.integer({ min: 50, max: 500 });
  const input = {
    request: uuid(),
    account: accountId,
    amount: balance,
  };
  const { body } = await request
    .post('/graphql')
    .send({
      query: `
      mutation($input: UpdateBalanceInput!)  {
        updateBalance(input: $input)) {
          request
          account
          amount
        }
      }
      `,
      variables: {
        input,
      },
    })
    .expect(200);

  t.is(body.data.updateAccount.request, input.request);
  t.is(body.data.updateAccount.account, input.account);
  t.is(body.data.updateAccount.amount, input.amount);
});

test.after(async () => {
  await server.stop();
});
