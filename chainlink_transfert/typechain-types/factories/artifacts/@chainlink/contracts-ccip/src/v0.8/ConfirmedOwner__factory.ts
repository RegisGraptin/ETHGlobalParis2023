/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../../common";
import type {
  ConfirmedOwner,
  ConfirmedOwnerInterface,
} from "../../../../../../artifacts/@chainlink/contracts-ccip/src/v0.8/ConfirmedOwner";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "OwnershipTransferRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50604051610a40380380610a40833981810160405281019061003291906102be565b8060008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036100a3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161009a90610348565b60405180910390fd5b816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610127576101268161012f60201b60201c565b5b5050506103d4565b3373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361019d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610194906103b4565b60405180910390fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fed8889f560326eb138920d842192f0eb3dd22b4f139c87a2c57538e05bae127860405160405180910390a350565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061028b82610260565b9050919050565b61029b81610280565b81146102a657600080fd5b50565b6000815190506102b881610292565b92915050565b6000602082840312156102d4576102d361025b565b5b60006102e2848285016102a9565b91505092915050565b600082825260208201905092915050565b7f43616e6e6f7420736574206f776e657220746f207a65726f0000000000000000600082015250565b60006103326018836102eb565b915061033d826102fc565b602082019050919050565b6000602082019050818103600083015261036181610325565b9050919050565b7f43616e6e6f74207472616e7366657220746f2073656c66000000000000000000600082015250565b600061039e6017836102eb565b91506103a982610368565b602082019050919050565b600060208201905081810360008301526103cd81610391565b9050919050565b61065d806103e36000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806379ba5097146100465780638da5cb5b14610050578063f2fde38b1461006e575b600080fd5b61004e61008a565b005b61005861021f565b6040516100659190610459565b60405180910390f35b610088600480360381019061008391906104a5565b610248565b005b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461011a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101119061052f565b60405180910390fd5b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a350565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b61025061025c565b610259816102ec565b50565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146102ea576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102e19061059b565b60405180910390fd5b565b3373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361035a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161035190610607565b60405180910390fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fed8889f560326eb138920d842192f0eb3dd22b4f139c87a2c57538e05bae127860405160405180910390a350565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061044382610418565b9050919050565b61045381610438565b82525050565b600060208201905061046e600083018461044a565b92915050565b600080fd5b61048281610438565b811461048d57600080fd5b50565b60008135905061049f81610479565b92915050565b6000602082840312156104bb576104ba610474565b5b60006104c984828501610490565b91505092915050565b600082825260208201905092915050565b7f4d7573742062652070726f706f736564206f776e657200000000000000000000600082015250565b60006105196016836104d2565b9150610524826104e3565b602082019050919050565b600060208201905081810360008301526105488161050c565b9050919050565b7f4f6e6c792063616c6c61626c65206279206f776e657200000000000000000000600082015250565b60006105856016836104d2565b91506105908261054f565b602082019050919050565b600060208201905081810360008301526105b481610578565b9050919050565b7f43616e6e6f74207472616e7366657220746f2073656c66000000000000000000600082015250565b60006105f16017836104d2565b91506105fc826105bb565b602082019050919050565b60006020820190508181036000830152610620816105e4565b905091905056fea2646970667358221220d00d458a9a5eb9970f3e921c2029cec3fc18334c963fe085d4d2213a5d146aa364736f6c63430008130033";

type ConfirmedOwnerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ConfirmedOwnerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ConfirmedOwner__factory extends ContractFactory {
  constructor(...args: ConfirmedOwnerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ConfirmedOwner> {
    return super.deploy(newOwner, overrides || {}) as Promise<ConfirmedOwner>;
  }
  override getDeployTransaction(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(newOwner, overrides || {});
  }
  override attach(address: string): ConfirmedOwner {
    return super.attach(address) as ConfirmedOwner;
  }
  override connect(signer: Signer): ConfirmedOwner__factory {
    return super.connect(signer) as ConfirmedOwner__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ConfirmedOwnerInterface {
    return new utils.Interface(_abi) as ConfirmedOwnerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ConfirmedOwner {
    return new Contract(address, _abi, signerOrProvider) as ConfirmedOwner;
  }
}
