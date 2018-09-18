import ReservedBalanceModel from '../../models/reserved-balance';


export default {
  Query: {
    reservedBalance: function (obj, args) {
      return ReservedBalanceModel.findOne({ where: { id: args.id } });
    },
    reservedBalances: function (obj, args) {
      return ReservedBalanceModel.findAll({ where: { account: args.account } });
    },
  },
};