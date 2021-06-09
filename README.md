# ERC20 Template Subgraph

## Description
This subgraph template enables developers to track  balances and approvals for ERC20 tokens.

## Useful Links

Example Subgraph is hosted at: https://thegraph.com/explorer/subgraph/valve-finance/erc20. You can also try below queries in the playground.


## Build Instructions
```
# copy env and adjust its content
# you can get an access token from https://thegraph.com/explorer/dashboard
cp .env.test .env
# edit config/mainnet.json file and add your desired ERC20 contract & corresponding start block for indexing
yarn
# creates a subgraph.yml file with desired contract and start block information specified in config file
yarn prepare:mainnet
yarn codegen
yarn build
yarn deploy
```

## Features & Capabilities
Here are a few examples of types of queries that can be run:

### Get asset information for your ERC20 token
```
{
  assets(first: 1) {
    id
    name
    symbol
    decimals
  }
}
```

### Get a user's token balance
```
{
  user(id: "0x574300348823910c6f82a6a3d859791b9cd0310e") {
    balance
  }
}
```

### Time travel query: get token balance at specified block number
```
{
  user(
    id: "0x574300348823910c6f82a6a3d859791b9cd0310e",
    block: {number: 12459565}
  ) {
    balance
  }
}
```

### Get a user's balance, and approvals
```
{
  user(id: "0x0000000000007f150bd6f54c40a34d7c3d5e9f56") {
    id
    balance
    approvals(where: {owner: "0x0000000000007f150bd6f54c40a34d7c3d5e9f56"}) {
      id
      count
      value
    }
  }
}

```
