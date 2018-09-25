import ReservedBalanceModel from '../../models/reserved-balance';


module.exports = {
  Query: {
    reservedBalance: async (obj, args) => (
      ReservedBalanceModel.findOne({ where: { id: args.id } })),
    reservedBalances: async (obj, args) => (
      ReservedBalanceModel.findAll({ where: { account: args.account } })),
  },
};
