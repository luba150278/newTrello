import React, { useState } from 'react';
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

interface Props {
  item: IList;
}

function ListItem({ item }: Props): JSX.Element {
  const [showInput, setShowInput] = useState(false);
  const cards = Object.values(item.cards);

  return (
    <div className={styles.listInner}>
      <div className={styles.listHeader}>
        <DeleteElement what="list" idList={item.id} />
        {cards.length !== 0 ? (
          <div className={styles.listNumber}>{`The number of cards is ${cards.length}`} </div>
        ) : null}
      </div>
      <ListTitle startTitle={item.title} idList={item.id} pos={item.position} />

      {cards.length !== 0 ? <CardList cards={cards} idList={item.id} /> : null}
      <div className={styles.addCardWrapp} onClick={(): void => setShowInput(!showInput)}>
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
