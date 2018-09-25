import AccountModel from '../models/account';

export default {
  updateBalanceTable: async (obj, args) => {
    const account = await AccountModel.findOne({ where: { id: args.account } });
    let val;
    try {
      if (account) {
        AccountModel.updateAttributes({
          balance: args.amount,
        });
        val = args.amount;
      }
    } catch (err) {
      val = err.message;
    }
    return val;
  },
};
