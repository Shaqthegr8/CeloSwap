// utils/celo.ts
import { newKit } from '@celo/contractkit';
import { CeloContract } from '@celo/contractkit/lib/base';

const kit = newKit('https://alfajores-forno.celo-testnet.org'); // Using Alfajores testnet

// Example function to get account balance
export const getBalance = async (address: string) => {
  const balance = await kit.getTotalBalance(address);
  return balance;
};

// Function to get contract instance
export const getContract = async (contractName: CeloContract) => {
  const contract = await kit.contracts.getContract(contractName);
  return contract;
};

export default kit;
