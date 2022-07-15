/* eslint-disable no-console */
import React, { useContext, useState } from 'react';
import { RiAddCircleLine } from 'react-icons/ri';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import styles from './ListItem.module.css';
import ListTitle from '../ListTitle/ListTitle';
import DeleteElement from '../DeleteElement/DeleteElement';
import Icon from '../Icon/Icon';
import { IList } from '../../interfaces/ILists';
import AddCard from '../AddCard/AddCard';
import CardList from '../CardList/CardList';
import { ICard } from '../../interfaces/ICard';
import Context from '../../context/Context';

interface Props {
  item: IList;
  lists: IList[];
}

function ListItem({ item, lists }: Props): JSX.Element {
  const { store } = useContext(Context);
  const [showInput, setShowInput] = useState(false);
  const cards = Object.values(item.cards);
  const cardSort = cards.sort((a: ICard, b: ICard) => (a.position > b.position ? 1 : -1));

  return (
    <div
      className={styles.listInner}
      onDragOver={(e): void => e.preventDefault()}
      onDrop={(): void => {
        store.setCurrentListID(item.id);
      }}
    >
      <div className={styles.listHeader}>
        <DeleteElement what="list" idList={item.id} />
        {cards.length !== 0 ? (
          <div className={styles.listNumber}>{`The number of cards is ${cards.length}`} </div>
        ) : null}
      </div>
      <ListTitle startTitle={item.title} idList={item.id} pos={item.position} />
      <CardList cards={cardSort} idList={item.id} lists={lists} />
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
        <AddCard idList={item.id} position={cards.length + 1} />
      </div>
    </div>
  );
}
export default observer(ListItem);
