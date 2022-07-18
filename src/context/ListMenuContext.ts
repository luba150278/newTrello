/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { ICard } from '../interfaces/ICard';
import { IList } from '../interfaces/ILists';

interface Props {
  showListMenu: boolean;
  toggleListMenu: () => void;
  sortCards: (params: number) => void;
  idList: number;
  listTitle: string;
  listPosition: number;
  cardsLength: number;
  cards: ICard[];
  lists: IList[];
}
const ListMenuContext = React.createContext<Props>({
  showListMenu: false,
  toggleListMenu: () => {},
  sortCards: (params: number) => {},
  idList: 0,
  listTitle: '',
  listPosition: 1,
  cardsLength: 0,
  cards: [],
  lists: [],
});
export const ListMenuProvider = ListMenuContext.Provider;
export default ListMenuContext;
