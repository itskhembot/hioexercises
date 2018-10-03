import AccountModel from '../models/account';

  export async function updateBalanceTable({}, args: any) {
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
