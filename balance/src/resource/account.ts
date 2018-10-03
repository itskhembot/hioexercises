import AccountModel from '../models/account';
import { IAccountInputType } from '../types/account-type';

  export async function updateBalanceTable({}, args: IAccountInputType) {
    const account = await AccountModel.findOne({ where: { id: args.account } });
    try {
      if (account) {
        await AccountModel.update({
          balance: account.balance + args.amount,
        }, { where: { id: args.account } });
        return account.balance + args.amount;
      }
    } catch (err) {
      throw new Error(err.message);
    }
    return 0;
  };
