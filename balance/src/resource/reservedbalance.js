import ReservedBalanceModel from '../models/reserved-balance';


module.exports = {
  createReserved: async (obj, args) => {
    const reservedBalance = await ReservedBalanceModel.findOne({
      where: {
        account: args.account,
        context: args.context,
      },
    });
    let val;
    try {
      if (!reservedBalance) {
        val = await ReservedBalanceModel.create({
          account: args.account,
          context: args.context,
          balance: args.amount,
        });
      } else {
        throw new Error('Reserve already exists!');
      }
    } catch (err) {
      val = err.message;
    }
    return val;
  },
  updateReserved: async (obj, args) => {
    const reservedBalance = await ReservedBalanceModel.findOne({
      where: {
        account: args.account,
        context: args.context,
      },
    });
    let val;
    try {
      if (reservedBalance) {
        val = await reservedBalance.update({
          balance: args.amount,
        }, { where: { account: args.account, context: args.context } });
      }
    } catch (err) {
      val = err.message;
    }
    return val;
  },
  releaseReserved: async (obj, args) => {
    const reservedBalance = await ReservedBalanceModel.findOne({
      where: {
        account: args.account,
        context: args.context,
      },
    });
    let val;
    try {
      if (reservedBalance) {
        await reservedBalance.update({
          isReleased: true,
        }, { where: { account: args.account, context: args.context } });
        val = true;
      }
    } catch (err) {
      val = err.message;
    }
    return val;
  },
};
