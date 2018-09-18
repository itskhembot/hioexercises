import VirtualBalanceModel from '../../models/virtual-balance';


export default {
  Query: {
    virtualBalance: function (obj, args) {
      return VirtualBalanceModel.findOne({ where: { id: args.id } });
    },
    virtualBalances: function (obj, args) {
      return VirtualBalanceModel.findAll({ where: { accountId: args.account } });
    },
  },
};