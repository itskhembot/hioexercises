import {GraphQLID, GraphQLInt, GraphQLString, GraphQLFloat, GraphQLObjectType, GraphQLInputObjectType} from 'graphql'


export interface IAccountInputType {
    request: string
    account: number
    amount: number
}


export const AccountInputType = new GraphQLInputObjectType({
    name: 'AccountInputType',
    description: 'Input type to update account balance',
    fields: () => ({
        request: {
            type: GraphQLString,
            description: 'UUID for client request'
        },
        account: {
            type: GraphQLInt,
            description: 'Account ID of updating account'
        },
        amount: {
            type: GraphQLFloat,
            description: 'Amount to be added/subtracted'
        }
    })
})