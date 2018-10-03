import AccountModel from '../../models/account';
import { IAccount } from '../../types/account-type';

export default {
  Query: {
    account: async ({}, args: IAccount) => (
      AccountModel.findOne({ where: { id: args.id } })),
  },
};
