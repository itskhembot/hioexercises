import VirtualBalanceModel from '../../models/virtual-balance';


export default {
  Query: {
    virtualBalance: async (obj, args) => {
      return VirtualBalanceModel.findOne({ where: { id: args.id } });
    },
    virtualBalances: async (obj, args) => {
      return VirtualBalanceModel.findAll({ where: { account: args.account } });
    },
  },
};
