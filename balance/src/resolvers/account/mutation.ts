import request from '../../resource/request';
import account from '../../resource/account';

export default {
  Mutation: {
    updateBalance: async (obj, args) => (
      request.idempotency(args, account.updateBalanceTable)
    ),
  },
};
