import ReservedBalanceModel from '../models/reserved-balance';

export default {
  createReserved: async ({}, args: any) => {
    let reservedBalance;
    try {
      reservedBalance = await ReservedBalanceModel.create({
        account: args.account,
        context: args.context,
        balance: args.amount,
      });
    } catch (err) {
      reservedBalance = err.message;
    }
    return reservedBalance;
  },
  updateReserved: async ({}, args: any) => {
    let reservedBalance;
    try {
      const [, [updatedReservedBalance]] = await ReservedBalanceModel.update({
        balance: args.amount,
      }, {
        where: { account: args.account, context: args.context },
        returning: true,
      });
      reservedBalance = updatedReservedBalance;
    } catch (err) {
      reservedBalance = err.message;
    }
    return reservedBalance;
  },
  releaseReserved: async ({}, args: any) => {
    try {
      await ReservedBalanceModel.update({
        isReleased: true,
      }, { where: { account: args.account, context: args.context } });
    } catch (err) {
      return err.message;
    }
    return true;
  },
};
