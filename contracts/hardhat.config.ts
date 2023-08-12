import '@nomicfoundation/hardhat-toolbox';
import '@nomiclabs/hardhat-solhint';
import { ethers } from 'hardhat';
import { HardhatUserConfig } from 'hardhat/config';

const privateKey = process.env.PRIVATE_KEY;
const accounts = privateKey !== undefined ? [privateKey] : [];
const config: HardhatUserConfig = {
  solidity: '0.8.19',
  networks: {
    goerli: {
      url: 'https://ethereum-goerli.publicnode.com',
      accounts: accounts,
    },
  },
};

export default config;
