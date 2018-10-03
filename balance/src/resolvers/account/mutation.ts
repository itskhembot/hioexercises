import request from '../../resource/request';
import account from '../../resource/account';

export default {
  Mutation: {
    updateBalance: async ({}, args: any) => (
      request.idempotency(args, account.updateBalanceTable)
    ),
  },
};
