export interface ITrackToken {
  name: string;
  address: string;
  avatar?: string;
  bookmark: boolean;
}

export default interface IUser {
  address: string;
  token: string;
  trackTokens: Array<ITrackToken>;
}