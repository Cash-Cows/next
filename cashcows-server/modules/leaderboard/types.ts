export type LeaderboardRow = {
  address: string,
  balance: string|number,
  share: number
};

export type LeaderboardProps = {
  boards: Record<string, LeaderboardRow[]>
};