import VirtualBalanceModel from '../models/virtual-balance';
import { IVirtualBalanceInput, IVirtualBalanceInputType } from '../types/virtual-balance-type';



export async function createVirtual({}, args: IVirtualBalanceInputType){
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
  };
  export async function updateVirtual({}, args: IVirtualBalanceInputType){
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
  };
  export async function cancelVirtual({}, args: IVirtualBalanceInput){
    try {
      await VirtualBalanceModel.destroy(
        { where: { account: args.account, context: args.context } },
      );
    } catch (err) {
      return err.message;
    }
    return true;
  };
  export async function commitVirtual({}, args: IVirtualBalanceInput){
    try {
      await VirtualBalanceModel.update({
        isCommit: true,
      }, { where: { account: args.account, context: args.context } });
    } catch (err) {
      return err.message;
    }
    return true;
  };
