// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fs = require('fs');

async function main() {
  // We get the contract to deploy
  const Quizz = await hre.ethers.getContractFactory("Quizz");
  const quizz = await Quizz.deploy();

  await quizz.deployed();
  
  // Get address
  const contractAddress = quizz.address;
  // Write file
  fs.writeFileSync('./.contract', contractAddress);
  // Get generated signer wallets
  const accounts = await hre.ethers.getSigners();
  // Get the first wallet address
  const walletAddress = accounts[0].address;
   // Write file
  fs.writeFileSync('./.wallet', walletAddress);

  console.log("Quizz contract deployed to:", quizz.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
