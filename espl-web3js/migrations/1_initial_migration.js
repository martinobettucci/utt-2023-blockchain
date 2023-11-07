var Election = artifacts.require("./Election.sol");

module.exports = async (deployer) => {
  await deployer.deploy(Election);
  electionInstance = await Election.deployed();
  await electionInstance.addCandidate("Kim Jong Un");
  await electionInstance.addCandidate("Putin");
};