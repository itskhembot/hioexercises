import request from '../../resource/request';
import account from '../../resource/account';

module.exports = {
  Mutation: {
    updateBalance: async (obj, args) => (
      request.idempotency(args, account.updateBalanceTable)
    ),
  },
};
