export type Station = {
  uid?: string;
  name: string;
  description: string;
  avatar: string;
  cover: string;
  monthly_fee: number;
  subscribers?: number;
  last_stream?: string;
};

export type User = {
  wallet: string;
  chainId: string;
};
