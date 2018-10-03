import {GraphQLInt, GraphQLString, GraphQLFloat, GraphQLInputObjectType} from 'graphql'

export interface IAccount {
  id: number
}
export interface IAccountInputType {
    request: string
    account: number
    amount: number
}

export const Account = new GraphQLInputObjectType({
  name: 'Account',
  description: 'Input type to query account',
  fields: () => ({
      id: {
          type: GraphQLInt,
          description: 'Account ID of account'
      }
  })
})

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