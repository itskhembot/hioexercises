import ReservedBalanceModel from '../models/reserved-balance';
import { IReservedBalanceInput, IReservedBalanceInputType } from '../types/reserved-balance-type';


  export async function createReserved({}, args: IReservedBalanceInputType){
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
  };
  export async function updateReserved({}, args: IReservedBalanceInputType){
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
  };
  export async function releaseReserved({}, args: IReservedBalanceInput){
    try {
      await ReservedBalanceModel.update({
        isReleased: true,
      }, { where: { account: args.account, context: args.context } });
    } catch (err) {
      return err.message;
    }
    return true;
  };
