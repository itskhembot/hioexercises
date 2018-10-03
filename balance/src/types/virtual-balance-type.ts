import {GraphQLInt, GraphQLString, GraphQLFloat, GraphQLInputObjectType} from 'graphql'

export interface IVirtualBalance {
    id: number
}

export interface IVirtualBalances {
    account: number
}

export interface IVirtualBalanceInput {
    request: string
    account: number
    context: string
}

export interface IVirtualBalanceInputType {
    request: string
    account: number
    context: string
    amount: number
}

export const VirtualBalance = new GraphQLInputObjectType({
    name: 'VirtualBalance',
    description: 'Input type to display VirtualBalance',
    fields: () => ({
        id: {
            type: GraphQLInt,
            description: 'ID of VirtualBalance'
        }
    })
})

export const VirtualBalances = new GraphQLInputObjectType({
    name: 'VirtualBalances',
    description: 'Input type to display VirtualBalances',
    fields: () => ({
        account: {
            type: GraphQLInt,
            description: 'Account linked to VirtualBalances'
        }
    })
})

export const VirtualBalanceInput = new GraphQLInputObjectType({
    name: 'VirtualBalanceInput',
    description: 'Input type to commit/cancel VirtualBalance',
    fields: () => ({
        request: {
            type: GraphQLString,
            description: 'UUID for client request'
        },
        account: {
            type: GraphQLInt,
            description: 'Request ID of updating Request'
        },
        context: {
            type: GraphQLString,
            description: 'Description/details for reserve'
        }
    })
})

export const VirtualBalanceInputType = new GraphQLInputObjectType({
    name: 'VirtualBalanceInputType',
    description: 'Input type to update VirtualBalance',
    fields: () => ({
        request: {
            type: GraphQLString,
            description: 'UUID for client request'
        },
        account: {
            type: GraphQLInt,
            description: 'Request ID of updating Request'
        },
        context: {
            type: GraphQLString,
            description: 'Description/details for reserve'
        },
        amount: {
            type: GraphQLFloat,
            description: 'Amount to be added/subtracted'
        }
    })
})