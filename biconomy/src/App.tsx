import './App.css';
import { IBundler, Bundler } from '@biconomy/bundler'
import { BiconomySmartAccount, BiconomySmartAccountConfig, DEFAULT_ENTRYPOINT_ADDRESS } from "@biconomy/account"
import { ChainId } from "@biconomy/core-types"
import { Wallet, providers, ethers } from 'ethers';
import SocialLogin from "@biconomy/web3-auth";
import "@biconomy/web3-auth/dist/src/style.css"
import { create } from 'domain';
import { IPaymaster, BiconomyPaymaster } from '@biconomy/paymaster'

const App:any =  () => {

  // configuration of the dotenv file, basically just the private key


  // This is the social login part of Biconomy  
  const socialLogin = async () => { 
    const socialLogin = await new SocialLogin()
    await socialLogin.init(); 
  
   await socialLogin.showWallet();


    const signature1 = await socialLogin.whitelistUrl('http://localhost:3000');

    await socialLogin.init({
      whitelistUrls: {
        'http://localhost:3000': signature1
      }
    });


    const pk = await socialLogin.getPrivateKey();
    console.log("pk", pk)
  }

  // This is the quickstart guide of Biconomy

const provider = new providers.JsonRpcProvider("https://rpc.ankr.com/polygon_mumbai")
const wallet = new Wallet(process.env.REACT_APP_PRIVATE_KEY || "", provider);


const bundler: IBundler = new Bundler({
  bundlerUrl: 'https://bundler.biconomy.io/api/v2/80001/abc',     
  chainId: ChainId.POLYGON_MUMBAI,
  entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
})

const biconomySmartAccountConfig: BiconomySmartAccountConfig = {
  signer: wallet,
  chainId: ChainId.POLYGON_MUMBAI,
  bundler: bundler
}

const paymaster = new BiconomyPaymaster({
  paymasterUrl: 'https://paymaster.biconomy.io/api/v1/80001/9Aag9hwAX.780eca36-7321-4217-b6e7-526f6f03bf97' // you can get this value from biconomy dashboard. https://dashboard.biconomy.io
})

  const createAccount = async () => {
    let biconomySmartAccount = new BiconomySmartAccount(biconomySmartAccountConfig)
    biconomySmartAccount =  await biconomySmartAccount.init()
    console.log("owner: ", biconomySmartAccount.owner)
    console.log("address: ", await biconomySmartAccount.getSmartAccountAddress())
    return biconomySmartAccount;
  }

  const createTransaction = async () => {
    console.log("creating account")

  const smartAccount = await createAccount();

  const transaction = {
    to: '0xE395793777e5619296b804b29b1E7f4E81524e0b', // smart contract 
    data: '0x',
    value: ethers.utils.parseEther('0.01'),
  }

  const userOp = await smartAccount.buildUserOp([transaction])

  const userOpResponse = await smartAccount.sendUserOp(userOp)

  const transactionDetail = await userOpResponse.wait()

  console.log("transaction detail below")
  console.log(transactionDetail)
  }

  return (
    <div className="App">
      <button onClick={() =>socialLogin()}>Create Web3 account</button>
      <button onClick={() => createAccount()}>Create Smart Account</button>
      <button onClick={() => createTransaction()}>Create Paymaster Transaction</button>
    </div>
  );
}

export default App;
