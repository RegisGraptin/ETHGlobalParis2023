require('@nomiclabs/hardhat-waffle');
require("@nomicfoundation/hardhat-verify");
require('hardhat-deploy');
require('dotenv').config();

module.exports = {
  solidity: "0.8.19",
  networks: {
    mumbai: {
      url: process.env.ALCHEMY_MUMBAI_URL,
      accounts: [process.env.MUMBAI_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: {
      polygonMumbai: 'GUPRJPDGQX4Y919YZ2BBYXUQ3QJPWAHN5P'
    }
  }
};

