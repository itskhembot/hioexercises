import virtualBalanceModel from '../models/virtual-balance';


module.exports = {
  createVirtual: async (obj, args) => {
    const virtualBalance = await virtualBalanceModel.findOne({
      where: {
        account: args.account,
        context: args.context,
      },
    });
    let val;
    try {
      if (!virtualBalance) {
        val = await virtualBalanceModel.create({
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
  updateVirtual: async (obj, args) => {
    const virtualBalance = await virtualBalanceModel.findOne({
      where: {
        account: args.account,
        context: args.context,
      },
    });
    let val;
    try {
      if (virtualBalance) {
        val = await virtualBalance.update({
          balance: args.amount,
        }, { where: { account: args.account, context: args.context } });
      }
    } catch (err) {
      val = err.message;
    }
    return val;
  },
  cancelVirtual: async (obj, args) => {
    const virtualBalance = await virtualBalanceModel.findOne({
      where: {
        account: args.account,
        context: args.context,
      },
    });
    let val;
    try {
      if (virtualBalance) {
        await virtualBalance.destroy({ where: { account: args.account, context: args.context } });
        val = true;
      }
    } catch (err) {
      val = err.message;
    }
    return val;
  },
  commitVirtual: async (obj, args) => {
    const virtualBalance = await virtualBalanceModel.findOne({
      where: {
        account: args.account,
        context: args.context,
      },
    });
    let val;
    try {
      if (virtualBalance) {
        await virtualBalance.update({
          isCommit: true,
        }, { where: { account: args.account, context: args.context } });
        val = true;
      }
    } catch (err) {
      val = err.message;
    }
    return val;
  },
};
