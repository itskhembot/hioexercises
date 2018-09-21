import ReservedBalanceModel from '../../models/reserved-balance';


export default {
  Query: {
    reservedBalance: async (obj, args) => (
      ReservedBalanceModel.findOne({ where: { id: args.id } })),
    reservedBalances: async (obj, args) => (
      ReservedBalanceModel.findAll({ where: { account: args.account } })),
  },
};
