# Introduction
Your task is to implement an API service based on the GraphQL schema given.

# Schema
## Account
Object representing the user account.
### Fields
|Field|Description|
|---|---|
|`id`|Unique ID of user|
|`balance`|Balance currently held by the user|
|`availableBalance`|Balance that is available for use for a specified context|

## ReservedBalance
Object representing a `reserved balance`. A `reserved balance` is a portion of the users balance that available only to the specified context.
### Fields
|Field|Description|
|---|---|
|`id`|Unique ID of `reserved balance`|
|`context`|Context at which this balance is available|
|`balance`|Amount|

## VirtualBalance
Object representing a `virtual balance`. A `virtual balance` is added on top of the user's balance. A `virtual balance` may be cancelled/removed any time. It is available only to the specified context.
### Fields
|Field|Description|
|---|---|
|`id`|Unique ID of `virtual balance`|
|`context`|Context at which this balance is available|
|`balance`|Amount|
