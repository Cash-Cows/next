//hooks
import { useState, useEffect } from 'react';
//config
import { currencies } from 'project.config';
//web3
import { read, getContract, toEther } from 'modules/web3';

const rewardOf = async (
  chain: string, 
  contract: string, 
  tokens: number[]
) => {
  const method = contract === ''
    ? 'releaseableBatch(uint256[])'
    : 'releaseableBatch(address,uint256[])';
  
  const args = contract === ''
    ? [ tokens ]
    : [ contract, tokens ];
  
  return toEther(await read(chain, 'royalty')[method](...args));
};

const useReward = (
  chain: string, 
  address: string,
  currency: string, 
  tokens: number[]
) => {
  const contract = getContract(chain, currency)?.address || '';
  const [ reward, setReward ] = useState({ 
    chain: '', 
    address: '', 
    tokens: 0, 
    amount: 0 
  });

  useEffect(() => {
    //if no chain, address or tokens
    if (!chain || !address || !tokens.length) {
      setReward({ 
        chain: '', 
        address: '', 
        tokens: 0, 
        amount: 0 
      });
    //if chain, address and tokens have changed
    } else if (chain !== reward.chain
      && address !== reward.address
      && tokens.length !== reward.tokens
    ) {
      rewardOf(chain, contract, tokens).then(reward => setReward({
        chain, 
        address,
        tokens: tokens.length, 
        amount: reward
      }));
    }
  }, [ chain, address, tokens.length ]);

  return reward.amount;
};

const useBalance = (chain: string, contract: string, address: string) => {
  const [ balance, setBalance ] = useState({ 
    chain: '', 
    address: '', 
    amount: 0 
  });
  useEffect(() => {
    //if no chain, address
    if (!chain || !address) {
      setBalance({ 
        chain: '', 
        address: '', 
        amount: 0 
      });
    //if chain, address and tokens have changed
    } else if (chain !== balance.chain
      && address !== balance.address
    ) {
      read(chain, contract).balanceOf(address).then(
        (rewards: number) => setBalance({
          chain, 
          address,
          amount: toEther(rewards)
        })
      );
    }
  }, [ chain, address ]);
  return balance.amount;
};

export default function useRewards(
  chain: string, 
  address: string, 
  tokens: number[]
) {
  const rewards: Record<string, number> = {};
  for (const currency of currencies) {
    rewards[currency] = useReward(chain, address, currency, tokens);
  }

  rewards.milk = useBalance(chain, 'milk', address);
  rewards.dolla = useBalance(chain, 'dolla', address);
  return rewards;
};