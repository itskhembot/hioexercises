import ReservedBalanceModel from '../../models/reserved-balance';


export default {
  Query: {
    reservedBalance: async (obj, args) => {
      return  ReservedBalanceModel.findOne({ where: { id: args.id } });
    },
    reservedBalances: async (obj, args) => {
      return ReservedBalanceModel.findAll({ where: { account: args.account } });
      
    },
  },
};