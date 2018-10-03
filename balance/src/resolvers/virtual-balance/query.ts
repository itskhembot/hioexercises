import VirtualBalanceModel from '../../models/virtual-balance';

export default {
  Query: {
    virtualBalance: async ({}, args: any) => (
      VirtualBalanceModel.findOne({ where: { id: args.id } })),
    virtualBalances: async ({}, args: any) => (
      VirtualBalanceModel.findAll({ where: { account: args.account } })),
  },
};
