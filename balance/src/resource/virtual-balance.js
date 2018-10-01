import VirtualBalanceModel from '../models/virtual-balance';


module.exports = {
  createVirtual: async (obj, args) => {
    let virtualBalance;
    try {
      virtualBalance = await VirtualBalanceModel.create({
        account: args.account,
        context: args.context,
        balance: args.amount,
      });
    } catch (err) {
      virtualBalance = err.message;
    }
    return virtualBalance;
  },
  updateVirtual: async (obj, args) => {
    let virtualBalance;
    try {
      await VirtualBalanceModel.update({
        balance: args.amount,
      }, {
        where: { account: args.account, context: args.context },
        returning: true,
        }).then(([rowsUpdate, [updatedVirtualBalance]]) => {// eslint-disable-line
        virtualBalance = updatedVirtualBalance;
      });
    } catch (err) {
      virtualBalance = err.message;
    }
    return virtualBalance;
  },
  cancelVirtual: async (obj, args) => {
    try {
      await VirtualBalanceModel.destroy(
        { where: { account: args.account, context: args.context } },
      );
    } catch (err) {
      return err.message;
    }
    return true;
  },
  commitVirtual: async (obj, args) => {
    try {
      await VirtualBalanceModel.update({
        isCommit: true,
      }, { where: { account: args.account, context: args.context } });
    } catch (err) {
      return err.message;
    }
    return true;
  },
};
