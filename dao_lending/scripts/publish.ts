import {
  PluginRepoFactory__factory,
  PluginRepoRegistry__factory,
  PluginRepo__factory,
} from '@aragon/osx-ethers';

import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { ethers } from "hardhat";

async function main() {
  
  const [deployer] = await ethers.getSigners()



  const pluginRepoFactoryAddr = '0x4E7c97ab08c046A8e43571f9839d768ae84492e4';

  const pluginRepoFactory = PluginRepoFactory__factory.connect(pluginRepoFactoryAddr, deployer);

  const pluginName = 'lend-plugin-v3';

  const pluginAddress = "0x8B333094980c2F2abA7c2C8d5FDbd02896f61337";

  const tx = await pluginRepoFactory.createPluginRepoWithFirstVersion(
    pluginName,
    pluginAddress,
    deployer.address,
    '0x00', // releaseMetadata: the hex representation of the CID containing your plugin's metadata - so the description, name, author, any UI, etc
    '0x00' // buildMetadata: same as above but for each build, rather than release
  );

  console.log(
    `You can find the transaction address which published the ${pluginName} Plugin here: ${tx}`
  );
  
  console.log(tx);
};


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});