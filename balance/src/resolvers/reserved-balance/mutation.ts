import request from '../../resource/request';
import reservedBalance from '../../resource/reserved-balance';

export default {
  Mutation: {
    createReservedBalance: async ({}, args: any) => (
      request.idempotency(args, reservedBalance.createReserved)
    ),
    updateReservedBalance: async ({}, args: any) => (
      request.idempotency(args, reservedBalance.updateReserved)
    ),
    releaseReservedBalance: async ({}, args: any) => (
      request.idempotency(args, reservedBalance.releaseReserved)
    ),
  },
};
