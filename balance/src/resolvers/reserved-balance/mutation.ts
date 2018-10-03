import { idempotency } from '../../resource/request';
import { createReserved, updateReserved, releaseReserved } from '../../resource/reserved-balance';
import { IReservedBalanceInput, IReservedBalanceInputType } from '../../types/reserved-balance-type';

export default {
  Mutation: {
    createReservedBalance: async ({}, args: IReservedBalanceInputType) => (
      idempotency(args, createReserved)
    ),
    updateReservedBalance: async ({}, args: IReservedBalanceInputType) => (
      idempotency(args, updateReserved)
    ),
    releaseReservedBalance: async ({}, args: IReservedBalanceInput) => (
      idempotency(args, releaseReserved)
    ),
  },
};
