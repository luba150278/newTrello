import React from 'react';
import { ICard } from '../interfaces/ICard';

interface Props {
  card: ICard;
  toggleModal: () => void;
  idList: number;
}
const CardMoveContext = React.createContext<Props>({
  card: { id: 0, position: 0, title: '', description: '', users: [] },
  idList: 0,
  toggleModal: (): void => {},
});
export const CardMoveProvider = CardMoveContext.Provider;
export default CardMoveContext;
