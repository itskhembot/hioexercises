import VirtualBalanceModel from '../../models/virtualbalance';


export default{
  Query: {
	virtualBalance: function(obj,args) {
		return VirtualBalanceModel.findOne({where: {id: args.id}});
        },
    virtualBalances: function(obj,args) {
		return VirtualBalanceModel.findAll({where: {accountid: args.id}});
        },
  },
};