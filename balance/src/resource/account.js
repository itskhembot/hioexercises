import AccountModel from '../models/account';

export default {
  updateBalanceTable: async (obj, args) => {
    await AccountModel.findOne({ where: { id: args.account } })
      .on('success', (result) => {
        if (result) {
          AccountModel.updateAttributes({
            balance: args.amount,
          });
        }
        return args.amount;
      });
  },
};
