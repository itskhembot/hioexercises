import ReservedBalanceModel from '../../models/reserved-balance';

module.exports = {
  Mutation: {
    createReservedBalance: async (obj, args) => {
      const createReservedBalance = ReservedBalanceModel.create({
        account: args.account,
        context: args.context,
        balance: args.amount,

      });
      return createReservedBalance;
    },
  },
};
