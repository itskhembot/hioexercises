"use strict";

var _ava = _interopRequireDefault(require("ava"));

var _account = _interopRequireDefault(require("../../models/account"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const url = `http://localhost:4000/`;

const request = require('supertest')(url);

const Chance = require('chance'),
      chance = new Chance();

(0, _ava.default)('query account', async t => {
  const accountId = chance.integer({
    min: 1,
    max: 3
  });
  const account = await _account.default.findOne({
    where: {
      id: 1
    },
    raw: true
  });
  const {
    body
  } = await request.post('/graphql').send({
    query: `
      query  {
        account(id: 1) {
          id
          balance
          availableBalance
        }
      }
      `,
    variables: {
      account: accountId
    }
  }).expect(200); //t.pass();
  //t.deepEqual(body.data.account.balance, account.balance);
  //t.deepEqual(body.data.account.availableBalance, account.availableBalance);

  t.deepEqual(body.data.account, account);
});