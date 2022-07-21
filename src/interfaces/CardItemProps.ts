import { ICard } from './ICard';

export interface CardItemProps {
  card: ICard;
  showMenu: boolean;
  openMenu: (idCard: string, listId: number) => void;
}
