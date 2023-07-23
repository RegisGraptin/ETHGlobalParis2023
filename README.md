# Flora App


Flora is a micro-lending app for rural smallholders without bank accounts to get short term loans without providing predatory collaterals.

Built at EthGlobal Paris 2023: https://ethglobal.com/showcase/flora-app-nqkw0


# Polygon ID Connect

Verify your identity and your own. For a farmer to be able to have a small lend, he needs to provide to proof:
- Proof of identity: by a KYC system and prove that the person is an adult.
- Proof of land: by providing proof that the farmer owns the land.

For this, we created two new schemes
- KYC 
https://schema-builder.polygonid.me/schemas/b0d3c4d0-85fd-4d83-a23a-17ff263290d3
https://ipfs.io/ipfs/QmcYsCGGxwahDRGbJx3bnCbuzkyVq8wKuQrXUzRsk5wZiK
ipfs://QmcYsCGGxwahDRGbJx3bnCbuzkyVq8wKuQrXUzRsk5wZiK

- Proof of land asset
https://schema-builder.polygonid.me/schemas/d14ef92e-4b38-435a-89ca-a2656a833916
https://ipfs.io/ipfs/QmdR4FWxM1k3HrY7kfzwcc6SqZL4pctTLKwgzh2wtiXCFQ
ipfs://QmdR4FWxM1k3HrY7kfzwcc6SqZL4pctTLKwgzh2wtiXCFQ

These scheme can be use by using the public instance by `https://issuer-ui.polygonid.me/schemas`.
Else, we can run a local instance with `polygon_id/fullstack-polygon-id-dapp/`.
Be sure to also run `./ngrok http 8080`to have access to the request.


## User information

Currently, in the `issuer-ui`, we can fill and approve user information. Regarding the workflow, a user will on our mobile application fill his information as his firstname, lastname... and send a picture of his ID. This information will then be send to an entity to validate them and approve them. When it is approve, a link will be generated and the user will have to accept those credentials with Polygon ID mobile app. Notice: this step can be done from another services, but we wanted to illustrate how a user can have credentials form the start.

When a user want to register to our app, it will first verify his information. For that purpose, we will create a NFT when the suer provide his identity and proof of land. Currently we manage the KYC system. We create a smart contract with `polygon_id/smartcontract_verify/contracts/ERC20Verifier.sol`. This contract is deployed: 0xa12189A9f4678377bf40932Cb32486f64F9bDeb4.

To get the NFT, the user will have to scan the QR Code provided by this front end: `polygon_id/front_kyc_proof` and `npm start`. When scanning the QR Code, the user will be asked to proof that he has done a KYC process and that he is an adult. Then, when those information are validated, the user will have a NFT.


### Resources

> Create a scheme data from polygon
https://issuer-ui.polygonid.me/schemas


> https://0xpolygonid.github.io/tutorials/verifier/on-chain-verification/overview/#design-the-erc20-zk-airdrop-verifier-contract
> https://github.com/0xPolygonID/tutorial-examples/tree/main/on-chain-verification


# Chainlink token transfer

The main process is done on polygon. But for smoothing the user process, we were thinking about transferring the token from polygon to gnosis to directly get the fund from the lend to the mobile phone/bank account of the customer. Also, this can be deploy on other chain to do some lending as the user will maybe not use directly all the money available.

To manage this aspect, we were thinking about using the chainlink technology. Unfortunately, at the moment, Chainlink Cross-Chain Interoperability Protocol (CCIP) on gnosis is not available yet. We were thinking about using chainlink technology when it will become available. Thus, we decided to use CCIP for token transfer from polygon to sepolia. 

For this purpose, we have created a transaction with the code present in `chainlink_transfer`. Here is the transaction hash: `0x7e422a10d9aa9b86d801ca1b61f7099836d6a51068e3c14186d74ee8ca6cdd83` and here is the CCIP message ID: `0x46eaf7a9ba48bc2ef0613a78254d3931ffe02c99e72d607bd50976acc0d615e7`.

> Note: https://ccip.chain.link/msg/0x46eaf7a9ba48bc2ef0613a78254d3931ffe02c99e72d607bd50976acc0d615e7

# Aragon 

We created a DAO. The first one was by using on the Aragon website, allowing us to create a DAO on polygon mombai testnet. Here is the link of this DAO:

> https://app.aragon.org/#/daos/mumbai/0x1d7a3f5e7a6d0f4cd62175c3f64e82edec73946c/dashboard

The DAO will act as the tresory keeper. Each farmer, after validation of the KYC and the Proof of Land, will be able to create a proposal to access a lending. People of the DAO will then analyse the case and approve or not the lending. This approach is the first one and was simple to implement. But we wanted to propose more customization approach for a proposal. Thus, we decided to implement additional plugins for the DAO. 

The first idea that we decided to implement is a NFT minting for the farmer. This will allow the creation of a reputation system that will allow us to see the number of loans accepted for this person. This implementation can be found `dao_lending/contracts/LendPluginSetup.sol`. We also managed the deployement of this smartcontract and the publishing of this plugin with two typescript files.

For future use case, we were thinking about a reputation system as a hall of fame for the contributors of the DAO. This will provide incentivize for people to participate in the voting phase for accepting or not a proposal. Also, regarding the DAO activity, another use case could be to have some metrics about the proposal that can be interesting or not.


# ZK Bob

When we are doing a proposal with Aragon, we have the possibility to execute a smart contract function when the proposal has been accepted. One interesting point here is that we can use ZK Bob deposit function to transfert the funds and to be able to keep privacy inside of the loop. This function can be found in the proxy implementation at the following address: `0x72894b24c50d68bffdd75b119a7e02b140f8cc1f`.


