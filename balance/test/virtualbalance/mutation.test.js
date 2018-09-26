import supertest from 'supertest';
import test from 'ava';
import uuid from 'uuid';
import casual from 'casual';
import VirtualBalanceModel from '../../src/models/virtual-balance';
import server from '../../src/index';

let superserver;
const Chance = require('chance');

const helperChance = new Chance();
const port = helperChance.integer({ max: 9000, min: 5000 });
test.before(async () => {
  superserver = supertest(await server.start(port));
});
test('create virtual', async (t) => {
  const request = uuid().toString();
  const account = helperChance.integer({ min: 1, max: 11 });
  const amount = helperChance.integer({ min: 50, max: 500 });
  const context = casual.sentence;

  const { body } = await superserver
    .post('/graphql')
    .send({
      query: `
      mutation($request: ID!, $account: ID!, $context: String!, $amount: Float!)  {
        createVirtualBalance(request: $request, account: $account, context: $context, amount: $amount){
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

  t.is(body.data.createVirtualBalance.account, account);
  t.is(body.data.createVirtualBalance.context, context);
  t.is(body.data.createVirtualBalance.balance, amount);
});

test('update virtual', async (t) => {
  const request = uuid().toString();
  const account = helperChance.integer({ min: 1, max: 11 });
  const amount = helperChance.integer({ min: 50, max: 500 });
  const virtualBalance = await VirtualBalanceModel.findOne(
    { where: { account } },
  );
  const context = virtualBalance.context.toString();
  const { body } = await superserver
    .post('/graphql')
    .send({
      query: `
      mutation($request: ID!, $account: ID!, $context: String!, $amount: Float!)  {
        updateVirtualBalance(request: $request, account: $account, context: $context, amount: $amount){
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
  t.is(body.data.updateVirtualBalance.account, account);
  t.is(body.data.updateVirtualBalance.context, context);
  t.is(body.data.updateVirtualBalance.balance, amount);
});

test('cancel virtual', async (t) => {
  const request = uuid().toString();
  const account = helperChance.integer({ min: 1, max: 11 });
  const amount = helperChance.integer({ min: 50, max: 500 });
  const virtualBalance = await VirtualBalanceModel.findOne(
    { where: { account } },
  );
  const context = virtualBalance.context.toString();
  const { body } = await superserver
    .post('/graphql')
    .send({
      query: `
      mutation($request: ID!, $account: ID!, $context: String!)  {
        cancelVirtualBalance(request: $request, account: $account, context: $context)
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
  t.is(body.data.cancelVirtualBalance, true);
});

test('commit virtual', async (t) => {
  const request = uuid().toString();
  const account = helperChance.integer({ min: 1, max: 11 });
  const amount = helperChance.integer({ min: 50, max: 500 });
  const virtualBalance = await VirtualBalanceModel.findOne(
    { where: { account } },
  );
  const context = virtualBalance.context.toString();
  const { body } = await superserver
    .post('/graphql')
    .send({
      query: `
      mutation($request: ID!, $account: ID!, $context: String!)  {
        commitVirtualBalance(request: $request, account: $account, context: $context)
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
  t.is(body.data.commitVirtualBalance, true);
});

test.after(async () => {
  await server.stop();
});
