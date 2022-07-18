/* eslint-disable no-console */
import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { TbPencil } from 'react-icons/tb';
import ListMenuContext from '../../context/ListMenuContext';
import { ICard } from '../../interfaces/ICard';
import CardMenu from '../CardMenu/CardMenu';
import CardTitle from '../CardTitle/CardTitle';
// import DeleteElement from '../DeleteElement/DeleteElement';
import Icon from '../Icon/Icon';
import styles from './CardItem.module.css';

export interface Props {
  card: ICard;
  showMenu: boolean;
  openMenu: (idCard: string, listId: number) => void;
}

function CardItem({ card, showMenu, openMenu }: Props): JSX.Element {
  const { idList } = useContext(ListMenuContext);
  const [closeMenu, setCloseMenu] = useState(true);
  const toggleCloseMenu = (): void => {
    setCloseMenu(!closeMenu);
  };

  return (
    <div className={styles.cardWrap}>
      <CardTitle card={card} />
      <div
        onClick={(): void => {
          toggleCloseMenu();
          openMenu(`${card.id}`, idList);
        }}
        className={styles.cardMenuIconWrap}
        id={`${card.id}`}
      >
        <Icon
          iconChild={<TbPencil />}
          styles={{
            className: 'iconPencil',
            size: '20',
            title: 'Card menu',
          }}
        />
      </div>
      {card.description !== '' ? <p>'xxx'</p> : null}
      {showMenu && !closeMenu ? <CardMenu card={card} idList={idList} /> : null}
    </div>
  );
}

export default observer(CardItem);
