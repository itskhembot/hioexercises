import supertest from 'supertest';
import test from 'ava';
import uuid from 'uuid';
import casual from 'casual';
import ReservedBalanceModel from '../../src/models/reserved-balance';
import server from '../../src/index';

let superserver;
const Chance = require('chance');

const helperChance = new Chance();
const port = helperChance.integer({ max: 9000, min: 5000 });
test.before(async () => {
  superserver = supertest(await server.start(port));
});
test('create reserve', async (t) => {
  const request = uuid().toString();
  const account = helperChance.integer({ min: 1, max: 11 });
  const amount = helperChance.integer({ min: 50, max: 500 });
  const context = casual.sentence;

  const { body } = await superserver
    .post('/graphql')
    .send({
      query: `
      mutation($request: ID!, $account: ID!, $context: String!, $amount: Float!)  {
        createReservedBalance(request: $request, account: $account, context: $context, amount: $amount){
          account
          context
          balance
        }
      }
      `,
      variables: {
        request,
        account,
        context,
        amount,
      },
    })
    .expect(200);

  t.is(body.data.createReservedBalance.account, account);
  t.is(body.data.createReservedBalance.context, context);
  t.is(body.data.createReservedBalance.balance, amount);
});

test('update reserve', async (t) => {
  const request = uuid().toString();
  const account = helperChance.integer({ min: 1, max: 11 });
  const amount = helperChance.integer({ min: 50, max: 500 });
  const reservedBalance = await ReservedBalanceModel.findOne(
    { where: { account } }, { raw: true },
  );
  const context = reservedBalance.context.toString();
  const { body } = await superserver
    .post('/graphql')
    .send({
      query: `
      mutation($request: ID!, $account: ID!, $context: String!, $amount: Float!)  {
        updateReservedBalance(request: $request, account: $account, context: $context, amount: $amount){
          account
          context
          balance
        }
      }
      `,
      variables: {
        request,
        account,
        context,
        amount,
      },
    })
    .expect(200);
  t.is(body.data.updateReservedBalance.account, account);
  t.is(body.data.updateReservedBalance.context, context);
  t.is(body.data.updateReservedBalance.balance, amount);
});

test('release reserve', async (t) => {
  const request = uuid().toString();
  const account = helperChance.integer({ min: 1, max: 11 });
  const amount = helperChance.integer({ min: 50, max: 500 });
  const reservedBalance = await ReservedBalanceModel.findOne(
    { where: { account } },
  );
  const context = reservedBalance.context.toString();
  const { body } = await superserver
    .post('/graphql')
    .send({
      query: `
      mutation($request: ID!, $account: ID!, $context: String!)  {
        releaseReservedBalance(request: $request, account: $account, context: $context)
      }
      `,
      variables: {
        request,
        account,
        context,
        amount,
      },
    })
    .expect(200);
  t.is(body.data.releaseReservedBalance, true);
});

test.after(async () => {
  await server.stop();
});
