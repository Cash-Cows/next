import type { BigNumber } from 'ethers';
import { ethers } from 'ethers';

export function toEther(wei: string|BigNumber, fixed: number = 6) {
  return parseFloat(parseFloat(ethers.utils.formatEther(wei)).toFixed(fixed));
}