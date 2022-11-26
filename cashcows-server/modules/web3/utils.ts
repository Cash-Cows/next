//types
import type { NetworkConfig } from 'modules/web3/types';
//web3
import { ethers } from 'ethers';
import { provider } from './config';

export function toBigNumber(number: any) {
  if (number instanceof ethers.BigNumber) {
    return number;
  }
  return ethers.BigNumber.from(number);
};

export function toEther(wei: any, fixed: number = 6) {
  return parseFloat(
    parseFloat(
      ethers.utils.formatEther(toBigNumber(wei))
    ).toFixed(fixed)
  );
};

export function read(network: NetworkConfig, contract: string) {
  const { address, abi } = network.contracts[contract];
  return new ethers.Contract(address, abi, provider({ 
    chainId: network.id 
  }));
};

export function write(
  network: NetworkConfig, 
  contract: string, 
  provider: any
) {
  const signer = typeof provider?.getSigner === 'function'
    ? provider.getSigner()
    : provider;
  const { address, abi } = network.contracts[contract];
  return new ethers.Contract(address, abi, signer);
};