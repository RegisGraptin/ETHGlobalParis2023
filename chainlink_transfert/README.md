## CCIP Starter Kit

> **Note**
>
> _This repository represents an example of using a Chainlink product or service. It is provided to help you understand how to interact with Chainlink’s systems so that you can integrate them into your own. This template is provided "AS IS" without warranties of any kind, has not been audited, and may be missing key checks or error handling to make the usage of the product more clear. Take everything in this repository as an example and not something to be copy pasted into a production ready service._

This project demonstrates a couple of basic Chainlink CCIP use cases.

## Prerequisites

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Current LTS Node.js version](https://nodejs.org/en/about/releases/)

Verify installation by typing:

```shell
node -v
```

and

```shell
npm -v
```

## Getting Started

1. Install packages

```
npm install
```

2. Compile contracts

```
npx hardhat compile
```

3. Run tests

```
TS_TRANSPILE_NODE=1 npx hardhat test
```

## What is Chainlink CCIP?

**Chainlink Cross-Chain Interoperability Protocol (CCIP)** provides a single, simple, and elegant interface through which dApps and web3 entrepreneurs can securely meet all their cross-chain needs, including token transfers and arbitrary messaging.

![basic-architecture](./img/basic-architecture.png)

With Chainlink CCIP, one can:

- Transfer supported tokens
- Send messages (any data)
- Send messages and tokens

CCIP receiver can be:

- Smart contract that implements `CCIPReceiver.sol`
- EOA

**Note**: If you send a message and token(s) to EOA, only tokens will arrive

To use this project, you can consider CCIP as a "black-box" component and be aware of the Router contract only. If you want to dive deep into it, check the [Official Chainlink Documentation](https://docs.chain.link/ccip).

## Usage

In the next section you can see a couple of basic Chainlink CCIP use case examples. But before that, you need to set up some environment variables.

We are going to use the [`@chainlink/env-enc`](https://www.npmjs.com/package/@chainlink/env-enc) package for extra security. It encrypts sensitive data instead of storing them as plain text in the `.env` file, by creating a new, `.env.enc` file. Although it's not recommended to push this file online, if that accidentally happens your secrets will still be encrypted.

1. Set a password for encrypting and decrypting the environment variable file. You can change it later by typing the same command.

```shell
npx env-enc set-pw
```

2. Now set the following environment variables: `PRIVATE_KEY`, Source Blockchain RPC URL, Destination Blockchain RPC URL. You can see available options in the `.env.example` file:

```shell
ETHEREUM_SEPOLIA_RPC_URL=""
OPTIMISM_GOERLI_RPC_URL=""
ARBITRUM_TESTNET_RPC_URL=""
AVALANCHE_FUJI_RPC_URL=""
POLYGON_MUMBAI_RPC_URL=""
```

To set these variables, type the following command and follow the instructions in the terminal:

```shell
npx env-enc set
```

After you are done, the `.env.enc` file will be automatically generated.

If you want to validate your inputs you can always run the next command:

```shell
npx env-enc view
```

### Faucet

You will need test tokens for some of the examples in this Starter Kit. Public faucets sometimes limit how many tokens a user can create and token pools might not have enough liquidity. To resolve these issues, CCIP supports two test tokens that you can mint permissionlessly so you don't run out of tokens while testing different scenarios.

To get 10\*\*18 units of each of these tokens, use the `faucet` task. Keep in mind that the `CCIP-BnM` test token you can mint on all testnets, while `CCIP-LnM` you can mint only on Ethereum Sepolia. On other testnets, the `CCIP-LnM` token representation is a wrapped/synthetic asset called `clCCIP-LnM`.

```shell
npx hardhat faucet
--receiver <RECEIVER_ADDRESS>
--ccip-bnm <CCIP_BnM_ADDRESS> # Optional
--ccip-lnm <CCIP_LnM_ADDRESS> # Optional
```

For example, to mint tokens on ethereumSepolia run:

```shell
npx hardhat faucet --network ethereumSepolia --receiver <RECEIVER_ADDRESS>
```

# Send from Polygon to Sepolia

npx hardhat ccip-token-transfer --source-blockchain polygonMumbai --destination-blockchain ethereumSepolia --receiver 0xc5EF893518208119968B294eE95d341C48c0f2e0 --token-address 0xf1E3A5842EeEF51F2967b3F05D45DD4f4205FF40 --amount 1 --gas-limit 0 --fee-token-address 0x326C977E6efc84E512bB9C30f76E30c160eD06FB

=> 0xf1E3A5842EeEF51F2967b3F05D45DD4f4205FF40


ℹ️  Checking whether the 0xf1E3A5842EeEF51F2967b3F05D45DD4f4205FF40 token is supported by Chainlink CCIP on the polygonMumbai blockchain
✅ Token 0xf1E3A5842EeEF51F2967b3F05D45DD4f4205FF40 is supported by Chainlink CCIP on the polygonMumbai blockchain

ℹ️  Attempting to approve Router smart contract (0x70499c328e1e2a3c41108bd3730f6670a44595d1) to spend 1 of 0xf1E3A5842EeEF51F2967b3F05D45DD4f4205FF40 tokens on behalf of 0xc5EF893518208119968B294eE95d341C48c0f2e0

✅ Approved successfully, transaction hash: 0xbf2d56c3f478f8640d715a37a0b9492531204b630c41904f7604eeead5e060df

ℹ️  Calculating CCIP fees...
ℹ️  Estimated fees (juels): 222733089702423630
ℹ️  Attempting to approve Router smart contract (0x70499c328e1e2a3c41108bd3730f6670a44595d1) to spend 222733089702423630 of 0xf1E3A5842EeEF51F2967b3F05D45DD4f4205FF40 tokens for Chainlink CCIP fees on behalf of 0xc5EF893518208119968B294eE95d341C48c0f2e0

✅ Approved successfully, transaction hash: 0xa654e08655f9610cf795db38d8e97bbe1bcd802d311d84e8a86c0aec4bc03188

ℹ️  Attempting to send 1 of 0xf1E3A5842EeEF51F2967b3F05D45DD4f4205FF40 tokens from the polygonMumbai blockchain to 0xc5EF893518208119968B294eE95d341C48c0f2e0 address on the ethereumSepolia blockchain

✅ Sent successfully! Transaction hash: 0x7e422a10d9aa9b86d801ca1b61f7099836d6a51068e3c14186d74ee8ca6cdd83
✅ You can now monitor the token transfer status via CCIP Explorer (https://ccip.chain.link) by searching for CCIP Message ID: 0x46eaf7a9ba48bc2ef0613a78254d3931ffe02c99e72d607bd50976acc0d615e7
✅ Task ccip-token-transfer finished with the execution

https://ccip.chain.link/msg/0x46eaf7a9ba48bc2ef0613a78254d3931ffe02c99e72d607bd50976acc0d615e7

