import { idempotency } from '../../resource/request';
import { createVirtual, updateVirtual, cancelVirtual, commitVirtual } from '../../resource/virtual-balance';
import { IVirtualBalanceInput, IVirtualBalanceInputType } from '../../types/virtual-balance-type';

export default {
  Mutation: {
    createVirtualBalance: async ({}, args: IVirtualBalanceInputType) => (
      idempotency(args, createVirtual)
    ),
    updateVirtualBalance: async ({}, args: IVirtualBalanceInputType) => (
      idempotency(args, updateVirtual)
    ),
    cancelVirtualBalance: async ({}, args: IVirtualBalanceInput) => (
      idempotency(args, cancelVirtual)
    ),
    commitVirtualBalance: async ({}, args: IVirtualBalanceInput) => (
      idempotency(args, commitVirtual)
    ),
  },
};
