import request from '../../resource/request';
import virtualBalance from '../../resource/virtualbalance';

module.exports = {
  Mutation: {
    createVirtualBalance: async (obj, args) => (
      request.idempotency(args, virtualBalance.createVirtual)
    ),
    updateVirtualBalance: async (obj, args) => (
      request.idempotency(args, virtualBalance.updateVirtual)
    ),
    cancelVirtualBalance: async (obj, args) => (
      request.idempotency(args, virtualBalance.cancelVirtual)
    ),
    commitVirtualBalance: async (obj, args) => (
      request.idempotency(args, virtualBalance.commitVirtual)
    ),
  },
};
