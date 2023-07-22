import React from "react";
import { render } from "react-dom";
import { QRCode } from "react-qr-svg";

const styles = {
  root: {
    color: "#2C1752",
    fontFamily: "sans-serif",
    textAlign: "center"
  },
  title: {
    color: "#7B3FE4"
  }
};

// update with your contract address
const deployedContractAddress = "0xa12189A9f4678377bf40932Cb32486f64F9bDeb4";

// more info on query based requests: https://0xpolygonid.github.io/tutorials/wallet/proof-generation/types-of-auth-requests-and-proofs/#query-based-request
// qrValueProofRequestExample: https://github.com/0xPolygonID/tutorial-examples/blob/main/on-chain-verification/qrValueProofRequestExample.json
const qrProofRequestJson = {
  id: "7f38a193-0918-4a48-9fac-36adfdb8b542",
  typ: "application/iden3comm-plain-json",
  type: "https://iden3-communication.io/proofs/1.0/contract-invoke-request",
  thid: "7f38a193-0918-4a48-9fac-36adfdb8b542",
  body: {
    reason: "Proof of Identity",
    transaction_data: {
      contract_address: deployedContractAddress,
      method_id: "b68967e2",
      chain_id: 80001,
      network: "polygon-mumbai"
    },
    scope: [
      {
        id: 1,
        circuitId: "credentialAtomicQuerySigV2OnChain",
        query: {
          allowedIssuers: ["*"],
          context:
            "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v3.json-ld",
          credentialSubject: {
            birthday: {
              $lt: 20030101
            }
          },
          type: "KYCAgeCredential"
        }
      }
    ]
  }
};

export default class App extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div style={styles.root}>
        <h2 style={styles.title}>
          Claim an ERC20 zk to prove your identity
        </h2>
        <p>
          You need to proove your identity and be an adult. 
          We are going to verify that your own a valid identity and your age.
        </p>
        <p>
          Complete verification by issuing yourself a Polygon ID claim via{" "}
          <a
            href="https://polygontechnology.notion.site/Issue-yourself-a-KYC-Age-Credential-claim-a06a6fe048c34115a3d22d7d1ea315ea"
            target="_blank"
          >
            KYC System
          </a>{" "}
          then scan QR code within Polygon ID app to claim tokens
        </p>

        <div>
          <QRCode
            level="Q"
            style={{ width: 256 }}
            value={JSON.stringify(qrProofRequestJson)}
          />
        </div>
        <br />
        <p>
          Github:{" "}
          <a
            href="https://github.com/oceans404/tutorial-examples/tree/main/on-chain-verification"
            target="_blank"
          >
            On-chain verification tutorial
          </a>
        </p>
        <p>
          Polygonscan:{" "}
          <a
            href={`https://mumbai.polygonscan.com/token/${deployedContractAddress}`}
            target="_blank"
          >
            Token ERC20zkAirdrop
          </a>
        </p>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
