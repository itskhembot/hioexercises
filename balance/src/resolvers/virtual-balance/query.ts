import VirtualBalanceModel from '../../models/virtual-balance';
import { IVirtualBalance, IVirtualBalances } from '../../types/virtual-balance-type';

export default {
  Query: {
    virtualBalance: async ({}, args: IVirtualBalance) => (
      VirtualBalanceModel.findOne({ where: { id: args.id } })),
    virtualBalances: async ({}, args: IVirtualBalances) => (
      VirtualBalanceModel.findAll({ where: { account: args.account } })),
  },
};
