import test from 'ava';
import AccountModel from '../../src/models/account';
const url = `http://localhost:4000/`;
const request = require('supertest')(url);
const Chance = require('chance'),
chance = new Chance();

test('query account', async (t) => {
  const accountId = chance.integer({ min: 1, max: 3 });
  const account = await AccountModel.findOne({ where: { id: 1 } ,raw: true});
  const { body  } = await request
    .post('/graphql')
    .send({
      query: `
      query($id: ID!)  {
        account(id: 1) {
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
    //.expect(200);

  //t.pass();
  //t.deepEqual(body.data.account.balance, account.balance);
  //t.deepEqual(body.data.account.availableBalance, account.availableBalance);
  t.deepEqual(body.data.account, account);
});

