import VirtualBalanceModel from '../models/virtual-balance';


export default {
  createVirtual: async ({}, args: any) => {
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
  updateVirtual: async ({}, args: any) => {
    let virtualBalance;
    try {
      const [, [updatedVirtualBalance]] = await VirtualBalanceModel.update({
        balance: args.amount,
      }, {
        where: { account: args.account, context: args.context },
        returning: true,
      });
      virtualBalance = updatedVirtualBalance;
    } catch (err) {
      virtualBalance = err.message;
    }
    return virtualBalance;
  },
  cancelVirtual: async ({}, args: any) => {
    try {
      await VirtualBalanceModel.destroy(
        { where: { account: args.account, context: args.context } },
      );
    } catch (err) {
      return err.message;
    }
    return true;
  },
  commitVirtual: async ({}, args: any) => {
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
