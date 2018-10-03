import ReservedBalanceModel from '../../models/reserved-balance';


export default {
  Query: {
    reservedBalance: async ({}, args: any) => (
      ReservedBalanceModel.findOne({ where: { id: args.id } })),
    reservedBalances: async ({}, args: any) => (
      ReservedBalanceModel.findAll({ where: { account: args.account } })),
  },
};
