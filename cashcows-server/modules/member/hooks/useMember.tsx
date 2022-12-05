//hooks
import useCrews from './useCrews';
import useRewards from './useRewards';
import useSteaks from './useSteaks';
import useTrophies from './useTrophies';

export default function useMember(chain: string, address: string) {
  //get the crews for this address
  const { crews, loaded } = useCrews(address);
  //get the steaks for this address
  const steaks = useSteaks(chain, address);
  //get the rewards for this address
  const rewards = useRewards(
    chain, 
    address, 
    crews.map(crew => crew.edition)
  );
  const { active, inactive } = useTrophies(crews, rewards.eth, steaks);

  return { 
    steaks: steaks,
    rewards: rewards,
    crews: { loaded, tokens: crews }, 
    trophies: { active, inactive }
  };
};