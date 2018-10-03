import request from '../../resource/request';
import virtualBalance from '../../resource/virtual-balance';
import { IVirtualBalanceInput, IVirtualBalanceInputType } from '../../types/virtual-balance-type';

export default {
  Mutation: {
    createVirtualBalance: async ({}, args: IVirtualBalanceInputType) => (
      request.idempotency(args, virtualBalance.createVirtual)
    ),
    updateVirtualBalance: async ({}, args: IVirtualBalanceInputType) => (
      request.idempotency(args, virtualBalance.updateVirtual)
    ),
    cancelVirtualBalance: async ({}, args: IVirtualBalanceInput) => (
      request.idempotency(args, virtualBalance.cancelVirtual)
    ),
    commitVirtualBalance: async ({}, args: IVirtualBalanceInput) => (
      request.idempotency(args, virtualBalance.commitVirtual)
    ),
  },
};
