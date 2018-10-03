import request from '../../resource/request';
import account from '../../resource/account';
import { IAccountInputType } from '../../types/account-type';

export default {
  Mutation: {
    updateBalance: async ({}, args: IAccountInputType) => (
      request.idempotency(args, account.updateBalanceTable)
    ),
  },
};
