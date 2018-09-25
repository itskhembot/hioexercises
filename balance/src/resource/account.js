import AccountModel from '../models/account';

module.exports = {
  updateBalanceTable: async (obj, args) => {
    const account = await AccountModel.findOne({ where: { id: args.account } });
    let val;
    try {
      if (account) {
        await AccountModel.update({
          balance: args.amount,
        }, { where: { id: args.account } });
        val = args.amount;
      }
    } catch (err) {
      val = err.message;
    }
    return val;
  },
};
