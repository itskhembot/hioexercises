import { idempotency } from '../../resource/request';
import { updateBalanceTable } from '../../resource/account';
import { IAccountInputType } from '../../types/account-type';

export default {
  Mutation: {
    updateBalance: async ({}, args: IAccountInputType) => (
      idempotency(args, updateBalanceTable)
    ),
  },
};
