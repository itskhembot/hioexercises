import request from '../../resource/request';
import reservedBalance from '../../resource/reserved-balance';
import { IReservedBalanceInput, IReservedBalanceInputType } from '../../types/reserved-balance-type';

export default {
  Mutation: {
    createReservedBalance: async ({}, args: IReservedBalanceInputType) => (
      request.idempotency(args, reservedBalance.createReserved)
    ),
    updateReservedBalance: async ({}, args: IReservedBalanceInputType) => (
      request.idempotency(args, reservedBalance.updateReserved)
    ),
    releaseReservedBalance: async ({}, args: IReservedBalanceInput) => (
      request.idempotency(args, reservedBalance.releaseReserved)
    ),
  },
};
