# ETHGlobalParis2023


# Polygon ID Connect

Verify your identity and your own. For a farmer to be able to have a small lend, he needs to provide to proof:
- Proof of identity: by a KYC system and prove that the person is an adult.
- Proof of land: by providing proof that the farmer owns the land.

For this, we created two new schemes
- KYC 
https://schema-builder.polygonid.me/schemas/b0d3c4d0-85fd-4d83-a23a-17ff263290d3
https://ipfs.io/ipfs/QmcYsCGGxwahDRGbJx3bnCbuzkyVq8wKuQrXUzRsk5wZiK
ipfs://QmcYsCGGxwahDRGbJx3bnCbuzkyVq8wKuQrXUzRsk5wZiK

- Proof of land
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


## Resources

> Create a scheme data from polygon
https://issuer-ui.polygonid.me/schemas


> https://0xpolygonid.github.io/tutorials/verifier/on-chain-verification/overview/#design-the-erc20-zk-airdrop-verifier-contract
> https://github.com/0xPolygonID/tutorial-examples/tree/main/on-chain-verification