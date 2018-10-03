import AccountModel from '../../models/account';


export default {
  Query: {
    account: async ({}, args: any) => (
      AccountModel.findOne({ where: { id: args.id } })),
  },
};
