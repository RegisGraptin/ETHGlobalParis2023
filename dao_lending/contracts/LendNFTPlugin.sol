// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.8.19;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


import {Plugin, IDAO} from '@aragon/osx/core/plugin/Plugin.sol';

contract FactoryNFT is ERC721URIStorage { 

  using Counters for Counters.Counter; 
  Counters.Counter private _tokenIds;

  constructor() ERC721("Farm Lender NFT", "FLN") {}

  function createToken() public {
      _tokenIds.increment();
      uint256 newItemId = _tokenIds.current();

      _mint(msg.sender, newItemId);
  }    
}

contract LendNFTPlugin is Plugin {
  // Permissions are what connects everything together. 
  // Addresses who have been granted the GREET_PERMISSION will be 
  // able to call on functions with the modifier `auth(GREET_PERMISSION_ID)`. 
  // These will be granted in the PluginSetup.sol contract up next.
  bytes32 public constant GREET_PERMISSION_ID = keccak256('GREET_PERMISSION');

  FactoryNFT private factory_NFT;

  constructor(IDAO _dao) Plugin(_dao) {
    factory_NFT = new FactoryNFT();
  }

  function lend_money() external auth(GREET_PERMISSION_ID) {
    factory_NFT.createToken();
  }

}
