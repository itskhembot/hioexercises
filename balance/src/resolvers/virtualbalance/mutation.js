import RequestModel from '../../models/request';
import VirtualBalanceModel from '../../models/virtual-balance';
export default {
  Mutation: {
    createVirtualBalance: async (obj, args) => {
      
      const createVirtualBalance = VirtualBalanceModel.create({
        account: args.account,
        context: args.context,
        balance: args.amount

      });
      return createVirtualBalance
    },
  },
};