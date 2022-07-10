import { ICard } from './ICard';

interface IUser {
  id: number;
  username: string;
}
export interface IList {
  id: number;
  title: string;
  cards: ICard[];
  position: number;
}

export interface ILists {
  users: IUser[];
  lists: IList[];
}
