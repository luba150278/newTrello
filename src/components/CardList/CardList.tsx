/* eslint-disable no-console */
import React, { useState, useContext } from 'react';
import cn from 'classnames';
import { Reorder } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { ICard } from '../../interfaces/ICard';
import styles from './CardList.module.css';
import { listItem, ulCard } from '../../common/constans/motionList';
import CardItem from '../CardItem/CardItem';
import GetListContext from '../../context/GetListContext';
import Context from '../../context/Context';

export interface Props {
  cards: ICard[];
  idList: number;
}

function CardList({ cards, idList }: Props): JSX.Element {
  const { store } = useContext(Context);
  const { id } = useContext(GetListContext);
  const [items, setItems] = useState(cards);
  // console.log(items, cards);
  async function xxx(): Promise<void> {
    await store.moveCardInOneList(items, id, idList);
    // await getList();
  }
  return (
    <Reorder.Group
      values={items}
      onReorder={setItems}
      className={styles.cardWrap}
      variants={ulCard}
      initial="hidden"
      animate="show"
    >
      {items.map((card) => (
        <Reorder.Item
          value={card}
          key={card.id}
          className={cn('card', styles.cardItem)}
          variants={listItem}
          onDragEnd={(): Promise<void> => xxx()}
          // onDrag={(event, info): void => console.log(info.point.x, info.point.y)}
        >
          <CardItem startTitle={card.title} idCard={`${card.id}`} idList={idList} />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}

export default observer(CardList);
