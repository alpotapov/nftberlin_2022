import { ethers } from 'ethers';
import artifacts from './hardhat_contracts.json';
import ERC20ABI from './ERC20.json';
import collectible from './YourCollectible.json';

const chainNames = {
  1: 'mainnet',
  3: 'ropsten',
  5: 'goerli',
  137: 'matic',
  31337: 'localhost',
};

const defaultNetworkId = 31337;
const defaultNetworkName = 'localhost';
const { contracts } = artifacts[defaultNetworkId][defaultNetworkName];

// const collectibleInterface = new ethers.utils.Interface(collectible.abi);
const registryInterface = new ethers.utils.Interface(
  contracts.ItemRegistry.abi
);
const gameRegistryInterface = new ethers.utils.Interface(
  contracts.GameRegistry.abi
);
const erc20Interface = new ethers.utils.Interface(ERC20ABI);

export const interfaces = {
  collectible: collectible.abi,
  registry: registryInterface,
  gameRegistry: gameRegistryInterface,
  erc20: erc20Interface,
};

const chainId = process.env.REACT_APP_NETWORK_ID;
const chainName = chainNames[chainId];
const registry = artifacts[chainId][chainName].contracts.ItemRegistry;
const gameRegistry = artifacts[chainId][chainName].contracts.GameRegistry;

export const addresses = {
  registry: registry.address,
  gameRegistry: gameRegistry.address,
};
