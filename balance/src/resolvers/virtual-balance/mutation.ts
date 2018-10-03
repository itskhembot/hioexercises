import request from '../../resource/request';
import virtualBalance from '../../resource/virtual-balance';

export default {
  Mutation: {
    createVirtualBalance: async ({}, args: any) => (
      request.idempotency(args, virtualBalance.createVirtual)
    ),
    updateVirtualBalance: async ({}, args: any) => (
      request.idempotency(args, virtualBalance.updateVirtual)
    ),
    cancelVirtualBalance: async ({}, args: any) => (
      request.idempotency(args, virtualBalance.cancelVirtual)
    ),
    commitVirtualBalance: async ({}, args: any) => (
      request.idempotency(args, virtualBalance.commitVirtual)
    ),
  },
};
