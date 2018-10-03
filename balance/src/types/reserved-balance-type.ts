import {GraphQLInt, GraphQLString, GraphQLFloat, GraphQLInputObjectType} from 'graphql'

export interface IReservedBalance {
    id: number
}

export interface IReservedBalances {
    account: number
}

export interface IReservedBalanceInput {
    request: string
    account: number
    context: string
}

export interface IReservedBalanceInputType {
    request: string
    account: number
    context: string
    amount: number
}

export const ReservedBalance = new GraphQLInputObjectType({
    name: 'ReservedBalance',
    description: 'Input type to display ReservedBalance',
    fields: () => ({
        id: {
            type: GraphQLInt,
            description: 'ID of ReservedBalance'
        }
    })
})

export const ReservedBalances = new GraphQLInputObjectType({
    name: 'ReservedBalances',
    description: 'Input type to display ReservedBalances',
    fields: () => ({
        account: {
            type: GraphQLInt,
            description: 'Account linked to ReservedBalances'
        }
    })
})

export const ReservedBalanceInput = new GraphQLInputObjectType({
    name: 'ReservedBalanceInput',
    description: 'Input type to release ReservedBalance',
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

export const ReservedBalanceInputType = new GraphQLInputObjectType({
    name: 'ReservedBalanceInputType',
    description: 'Input type to update ReservedBalance',
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