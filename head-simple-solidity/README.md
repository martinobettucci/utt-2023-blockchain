# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

```
1927  nvm use 20
1935  npm install --save-dev hardhat
1938  npx hardhat compile
1939  npm install --save-dev @nomicfoundation/hardhat-network-helpers
1940  npm install --save-dev @nomicfoundation/hardhat-chai-matchers
1942  npm install --save-dev mocha
1943  npm install --save-dev chai
1944  npx hardhat test
1945  npx hardhat compile
1946  npx hardhat clean
1950  npm install --save-dev @nomicfoundation/hardhat-toolbox
1955  npx hardhat run scripts/deploy.js --network localhost
1957  npm install @openzeppelin/contracts
1989  wget https://github.com/trufflesuite/ganache-ui/releases/download/v2.7.1/ganache-2.7.1-linux-x86_64.AppImage -O ganache.AppImage
1990  chmod +x ganache.AppImage
1991  ./ganache.AppImage
2002  npm install --save-dev @nomiclabs/hardhat-solhint
2004  npm install --save-dev solhint
2008  npx solhint --init
2009  npx hardhat check
2010  npm hardhat test
2014  npm install --save-dev solidity-coverage
2015  npx hardhat coverage
2016  npm install hardhat-gas-reporter --save-dev
2020  npx hardhat test
2021  npx hardhat coverage
2026  npm install --save-dev @nomicfoundation/hardhat-ignition-ethers
2027  mkdir -p ignition/modules
2028  npx hardhat ignition deploy ignition/modules/Headn.js --network localhost
2029  npx hardhat ignition deploy ignition/modules/Headn.js --network sepolia
2030  npm install --save-dev @nomicfoundation/hardhat-verify
2031  npx hardhat verify --network sepolia 0x202579D516B27A9431D0d7E43410E166cB31976E
2032  npm install --save-dev hardhat-storage-layout
2034  npx hardhat compile
2035  npx hardhat check
```
