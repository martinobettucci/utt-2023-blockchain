require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-solhint");

require("@nomicfoundation/hardhat-verify");
require("@nomicfoundation/hardhat-ignition-ethers");

require("hardhat-gas-reporter");
require("hardhat-slither");
require('hardhat-storage-layout');


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  gasReporter: {
    enabled: true
  },
  networks: {
    sepolia: {
      url: 'https://sepolia.infura.io/v3/935b8719bb7241388c92c05a91172379',
      accounts: ["b250cb15651a5a1ebc5da5a69eaa122e2bdf8f868813cda202f30bc77ff9d589"]
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "GADI1CQR2KS2IRZ7ZEDRN3PGQD9D2MECZX"
  },
  sourcify: {
    // Disabled by default
    // Doesn't need an API key
    enabled: true
  }
  /*networks: {
    hardhat: {
      forking: {
        url: "https://mainnet.infura.io/v3/935b8719bb7241388c92c05a91172379"
      }
    }
  }*/
};
