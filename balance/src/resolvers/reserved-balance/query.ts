import ReservedBalanceModel from '../../models/reserved-balance';
import { IReservedBalance, IReservedBalances } from '../../types/reserved-balance-type';


export default {
  Query: {
    reservedBalance: async ({}, args: IReservedBalance) => (
      ReservedBalanceModel.findOne({ where: { id: args.id } })),
    reservedBalances: async ({}, args: IReservedBalances) => (
      ReservedBalanceModel.findAll({ where: { account: args.account } })),
  },
};
