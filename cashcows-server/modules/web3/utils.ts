//types
import type { NetworkConfig } from 'modules/web3/types';
//enums
import { NetworkNames } from './enums';
//web3
import { ethers } from 'ethers';
import { networks, provider } from './config';

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

export function getNetwork(chain: string): NetworkConfig {
  return networks[chain as NetworkNames];
}

export function read(chain: string, contract: string) {
  const network = getNetwork(chain);
  const { address, abi } = network.contracts[contract];
  return new ethers.Contract(address, abi, provider({ 
    chainId: network.id 
  }));
};

export function write(chain: string, contract: string, provider: any) {
  const network = getNetwork(chain);
  const signer = typeof provider?.getSigner === 'function'
    ? provider.getSigner()
    : provider;
  const { address, abi } = network.contracts[contract];
  return new ethers.Contract(address, abi, signer);
};