import supertest from 'supertest';
import test from 'ava';
import uuid from 'uuid';
import server from '../../src/index';
import AccountModel from '../../src/models/account';

let superserver;
const Chance = require('chance');

const helperChance = new Chance();
const port = helperChance.integer({ max: 9000, min: 5000 });
test.before(async () => {
  superserver = supertest(await server.start(port));
});

test('update balance', async (t) => {
  const request = uuid().toString();
  const account = helperChance.integer({ min: 1, max: 40 });
  const amount = helperChance.integer({ min: 50, max: 500 });
  const accountModel = await AccountModel.findOne(
    { where: { id: account } },
  );
  const { body } = await superserver
    .post('/graphql')
    .send({
      query: `
      mutation($request: ID!, $account: ID!, $amount: Float!)  {
        updateBalance(request: $request, account: $account, amount: $amount)
      }
      `,
      variables: {
        request,
        account,
        amount,
      },
    })
    .expect(200);

  t.is(body.data.updateBalance, accountModel.balance + amount);
});

test.after(async () => {
  await server.stop();
});
