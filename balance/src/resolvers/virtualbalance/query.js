import VirtualBalanceModel from '../../models/virtual-balance';


export default {
  Query: {
    virtualBalance: async (obj, args) => {
      const virtualBalance = VirtualBalanceModel.findOne({ where: { id: args.id } });
      return virtualBalance;
    },
    virtualBalances: async (obj, args) => {
      const virtualBalances = VirtualBalanceModel.findAll({ where: { account: args.account } });
      return virtualBalances;
    },
  },
};