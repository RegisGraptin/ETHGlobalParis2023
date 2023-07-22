require('@nomiclabs/hardhat-waffle');
require('dotenv').config();
require('@openzeppelin/hardhat-upgrades');
module.exports = {
  // solidity: "0.8.17",
  // networks: {
  //   mumbai: {
  //     chainId: 80001,
  //     url: `${process.env.ALCHEMY_MUMBAI_URL}`,
  //     accounts: [`0x${process.env.MUMBAI_PRIVATE_KEY}`]
  //   }
  // }

  solidity: "0.8.17",
  defaultNetwork: "mumbai",
  networks: {
    hardhat: {},
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/hcFrhMzqBw5qNFrG25xGAXRU4sMciI2W",
      accounts: ["68db64d3dd20ac53067c2bd35abf582fb18b3a828c1d26c32c7cd0dedf04c5b1"],
    },
  },
  etherscan: {
    apiKey: "7X3I65PIG4M895ZAQ9M7J834U3H8P2DXZA",
  },
};
