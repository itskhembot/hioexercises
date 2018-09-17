import ReservedBalanceModel from '../../models/reservedbalance';


export default {
  Query: {
    reservedBalance: function (obj, args) {
      return ReservedBalanceModel.findOne({ where: { id: args.id } });
    },
    reservedBalances: function (obj, args) {
      return ReservedBalanceModel.findAll({ where: { accountid: args.id } });
    },
  },
};