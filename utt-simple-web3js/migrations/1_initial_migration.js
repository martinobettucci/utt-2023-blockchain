const fs = require('fs');
const path = require('path');
const Election = artifacts.require("./Election.sol");

module.exports = async (deployer) => {
  await deployer.deploy(Election);
  const electionInstance = await Election.deployed();

  // Construct the path to the build/contracts directory
  const buildDir = path.join(__dirname, '../build/contracts');

  // Construct the path for the new JSON file to store the address
  const addressFilePath = path.join(buildDir, 'ElectionAddress.json');

  // Create an object with the contract address
  const addressObject = { address: electionInstance.address };

  // Write the object to a JSON file
  fs.writeFileSync(addressFilePath, JSON.stringify(addressObject, null, 2));

  // Add candidates
  await electionInstance.addCandidate("Kim Jong Un");
  await electionInstance.addCandidate("Putin");
};
