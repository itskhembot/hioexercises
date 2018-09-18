import ReservedBalanceModel from '../../models/reserved-balance';


export default {
  Query: {
    reservedBalance: async (obj, args) => {
      const reservedBalance =  ReservedBalanceModel.findOne({ where: { id: args.id } });
      return reservedBalance;
    },
    reservedBalances: async (obj, args) => {
      const reservedBalances = ReservedBalanceModel.findAll({ where: { account: args.account } });
      return reservedBalances;
    },
  },
};