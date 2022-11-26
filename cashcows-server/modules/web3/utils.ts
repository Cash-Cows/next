import type { BigNumber } from 'ethers';
import { ethers } from 'ethers';

export function toBigNumber(number: any) {
  if (number instanceof ethers.BigNumber) {
    return number;
  }
  return ethers.BigNumber.from(number);
}

export function toEther(wei: any, fixed: number = 6) {
  return parseFloat(
    parseFloat(
      ethers.utils.formatEther(toBigNumber(wei))
    ).toFixed(fixed)
  );
}