import { ethers } from 'ethers';
import artifacts from './hardhat_contracts.json';

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

const medicalRecordInterface = new ethers.utils.Interface(
  contracts.MedicalRecord.abi
);

export const interfaces = {
  medicalRecord: medicalRecordInterface,
};

const chainId = process.env.REACT_APP_NETWORK_ID;
const chainName = chainNames[chainId];
const medicalRecord = artifacts[chainId][chainName].contracts.MedicalRecord;

export const addresses = {
  medicalRecord: medicalRecord.address,
};
