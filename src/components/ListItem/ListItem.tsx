/* eslint-disable no-console */
import React, { useContext, useState } from 'react';
import { RiAddCircleLine } from 'react-icons/ri';
import { CgMoreAlt } from 'react-icons/cg';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import styles from './ListItem.module.css';
import ListTitle from '../ListTitle/ListTitle';
// import DeleteElement from '../DeleteElement/DeleteElement';
import Icon from '../Icon/Icon';
import { IList } from '../../interfaces/ILists';
import AddCard from '../AddCard/AddCard';
import CardList from '../CardList/CardList';
import { ICard } from '../../interfaces/ICard';
import Context from '../../context/Context';
import ListMenuWrap from '../ListMenuWrap/ListMenuWrap';
import { ListMenuProvider } from '../../context/ListMenuContext';
import { IAddCard } from '../../interfaces/IAddCard';

interface Props {
  item: IList;
  lists: IList[];
}

function ListItem({ item, lists }: Props): JSX.Element {
  const { store } = useContext(Context);
  const [showInput, setShowInput] = useState(false);
  const [showListMenu, setShowListMenu] = useState(false);
  const toggleListMenu = (): void => {
    setShowListMenu(!showListMenu);
  };
  const cards = Object.values(item.cards);
  const [cardsArr, setCardsArr] = useState(cards.sort((a: ICard, b: ICard) => (a.position > b.position ? 1 : -1)));

  const sortCards = (paramSort: number): void => {
    switch (paramSort) {
      case 0: {
        setCardsArr(cards.sort((a: ICard, b: ICard) => (a.title > b.title ? 1 : -1)));
        break;
      }
      case 1: {
        setCardsArr(cards.sort((a: ICard, b: ICard) => (a.title < b.title ? 1 : -1)));
        break;
      }
      case 2: {
        setCardsArr(cards.sort((a: ICard, b: ICard) => (a.position > b.position ? 1 : -1)));
        break;
      }
      case 3: {
        setCardsArr(cards.sort((a: ICard, b: ICard) => (a.position < b.position ? 1 : -1)));
        break;
      }
      case 4: {
        setCardsArr(cards.sort((a: ICard, b: ICard) => (a.id > b.id ? 1 : -1)));
        break;
      }
      case 5: {
        setCardsArr(cards.sort((a: ICard, b: ICard) => (a.id < b.id ? 1 : -1)));
        break;
      }
      default: {
        setCardsArr(cards.sort((a: ICard, b: ICard) => (a.position > b.position ? 1 : -1)));
      }
    }
  };

  const addCardProps: IAddCard = { idList: item.id, position: cards.length + 1 };
  return (
    <ListMenuProvider
      value={{
        showListMenu,
        toggleListMenu,
        sortCards,
        idList: item.id,
        listTitle: item.title,
        listPosition: item.position,
        cardsLength: cardsArr.length,
        cards: cardsArr,
        lists,
      }}
    >
      <div
        className={styles.listInner}
        onDragOver={(e): void => e.preventDefault()}
        onDrop={(): void => {
          store.setCurrentListID(item.id);
        }}
      >
        <div className={styles.listHeader}>
          <div className={styles.iconWrap} onClick={toggleListMenu}>
            <Icon
              iconChild={<CgMoreAlt />}
              styles={{
                className: 'icon',
                size: '20',
              }}
            />
          </div>
        </div>
        <ListTitle />
        <CardList />
        <div
          className={cn(styles.addCardWrapp, { [styles.hidden]: showInput })}
          onClick={(): void => setShowInput(!showInput)}
        >
          <Icon
            iconChild={<RiAddCircleLine />}
            styles={{
              className: 'icon',
              size: '25',
            }}
            isToolTip
            toolTipText="Add a new card"
            toolTipPlace="top"
          />
        </div>
        <div className={cn(styles.addCard, { [styles.hidden]: !showInput })}>
          <AddCard {...addCardProps} />
        </div>
        <div className={styles.cardNumber}>{cardsArr.length}</div>
        <ListMenuWrap />
      </div>
    </ListMenuProvider>
  );
}
export default observer(ListItem);
