export type LeaderboardRow = {
  address: string,
  balance: string|number,
  share: number
};

export type LeaderboardProps = {
  boards: Record<string, LeaderboardRow[]>
};

export type MemberProps = { 
  chain: string, 
  address: string 
};

export type TrophyProps = {
  image: string,
  name: string,
  content: string
};