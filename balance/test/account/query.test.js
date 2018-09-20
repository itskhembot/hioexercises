import test from 'ava';
import AccountModel from '../../src/models/account';
// import server from '../helpers/server';
// import supertest from 'supertest';
// let request;
const url = `http://localhost:4000/`;
const request = require('supertest')(url);
const Chance = require('chance'),
chance = new Chance();

// test.before(async () => {
//   const port = 4000;
//   request = supertest(await server.start({ port }));
// });
// test.after(async () => {
//   server.stop();
// });
test('query account', async (t) => {
  const accountId = chance.integer({ min: 1, max: 3 });
  const account = await AccountModel.findOne({ where: { id: accountId } ,raw: true});
  const { body  } = await request
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
        id: accountId
      },
    })
    .expect(200);

  t.deepEqual(body.data.account.balance, account.balance);
  t.deepEqual(body.data.account.availableBalance, account.availableBalance);
  t.deepEqual(body.data.account.id, account.id.toString());
});

