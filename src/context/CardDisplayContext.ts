import React from 'react';
import { ICard } from '../interfaces/ICard';
import { IList } from '../interfaces/ILists';

interface Props {
  card: ICard;
  listID: number;
  lists: IList[];
  id: string;
}
const CardDisplayContext = React.createContext<Props>({
  card: { id: 0, position: 0, title: '', description: '', users: [] },
  listID: 0,
  lists: [],
  id: '0',
});
export const CardDisplayProvider = CardDisplayContext.Provider;
export default CardDisplayContext;
