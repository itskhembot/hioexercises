import request from '../../resource/request';
import reservedBalance from '../../resource/reserved-balance';

module.exports = {
  Mutation: {
    createReservedBalance: async (obj, args) => (
      request.idempotency(args, reservedBalance.createReserved)
    ),
    updateReservedBalance: async (obj, args) => (
      request.idempotency(args, reservedBalance.updateReserved)
    ),
    releaseReservedBalance: async (obj, args) => (
      request.idempotency(args, reservedBalance.releaseReserved)
    ),
  },
};
