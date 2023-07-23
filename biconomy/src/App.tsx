import './App.css';
import { IBundler, Bundler } from '@biconomy/bundler'
import { BiconomySmartAccount, BiconomySmartAccountConfig, DEFAULT_ENTRYPOINT_ADDRESS } from "@biconomy/account"
import { ChainId } from "@biconomy/core-types"
import { Wallet, providers, ethers } from 'ethers';
import SocialLogin from "@biconomy/web3-auth";
import "@biconomy/web3-auth/dist/src/style.css"
import { create } from 'domain';
import { IPaymaster, BiconomyPaymaster, IHybridPaymaster,SponsorUserOperationDto, PaymasterMode } from '@biconomy/paymaster'
import farm from "./images/farm.jpeg"


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

const paymaster = new BiconomyPaymaster({
  paymasterUrl: 'https://paymaster.biconomy.io/api/v1/80001/9Aag9hwAX.780eca36-7321-4217-b6e7-526f6f03bf97' // you can get this value from biconomy dashboard. https://dashboard.biconomy.io
})

const biconomySmartAccountConfig: BiconomySmartAccountConfig = {
  signer: wallet,
  chainId: ChainId.POLYGON_MUMBAI,
  bundler: bundler,
  paymaster:paymaster
}



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

  const incrementTx = new ethers.utils.Interface(["function requestLoan()"]);
    const data = incrementTx.encodeFunctionData("requestLoan");

  const transaction = {
    to: '0xc49e36e3bd5239a6587236b92f273d7b934a05be', // smart contract 
    data: data,
    // value: ethers.utils.parseEther('0.01'),
  }

  const partialUserOp = await smartAccount.buildUserOp([transaction])

  const biconomyPaymaster = smartAccount.paymaster as IHybridPaymaster<SponsorUserOperationDto>;

  let paymasterServiceData: SponsorUserOperationDto = {
    mode: PaymasterMode.SPONSORED,
    // optional params...
  };

  console.log(partialUserOp)

  const paymasterAndDataResponse = await biconomyPaymaster.getPaymasterAndData(partialUserOp, paymasterServiceData);
  partialUserOp.paymasterAndData = paymasterAndDataResponse.paymasterAndData;

  const userOpResponse = await smartAccount.sendUserOp(partialUserOp)

  console.log(userOpResponse)

  const transactionDetail = await userOpResponse.wait()

  console.log("transaction detail below")
  console.log(transactionDetail)
  }

  return (
    <div className="flex flex-col gap-5">
      <img src={farm} alt="" />
      <div className='text-black font-bold text-3xl py-2 px-4 flex justify-center'>Flora</div>
      <div style={{textAlign: "center"}} className='text-black font-bold py-2 px-4 -mt-3 '>Where farmers can borrow crypto assets to grow their farm </div>
      <button className='border-2 rounded-xl font-bold py-2 px-4 bg-green-400 hover:bg-white hover:text-black transition-all duration-200 ml-3 mr-3' onClick={() => socialLogin()}>Login</button>
      {/* <button className='border-2 rounded-xl font-bold py-2 px-4 hover:bg-black hover:text-white transition-all duration-200' onClick={() => createAccount()}>Create Smart Account</button> */}
      <button className='border-2 rounded-xl font-bold py-2 px-4 bg-green-400 hover:bg-white hover:text-black transition-all duration-200 ml-3 mr-3' onClick={() => createTransaction()}>Submit Loan Request</button>
    </div>
  );
}

export default App;
