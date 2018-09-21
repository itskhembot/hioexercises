import VirtualBalanceModel from '../../models/virtual-balance';


export default {
  Query: {
    virtualBalance: async (obj, args) => (
      VirtualBalanceModel.findOne({ where: { id: args.id } })),
    virtualBalances: async (obj, args) => (
      VirtualBalanceModel.findAll({ where: { account: args.account } })),
  },
};
