import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const getLendPluginSetup = await ethers.getContractFactory("LendPluginSetup");
  const PluginSetup = await getLendPluginSetup.deploy();

  await PluginSetup.deployed();

  console.log("PluginSetup address:", PluginSetup.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});