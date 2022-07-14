/* eslint-disable no-console */
import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { ICard } from '../../interfaces/ICard';
import styles from './CardList.module.css';
import { listItem, ulCard } from '../../common/constans/motionList';
import CardItem from '../CardItem/CardItem';
import GetListContext from '../../context/GetListContext';
import Context from '../../context/Context';
import { IList } from '../../interfaces/ILists';
import './CardList.css';

export interface Props {
  cards: ICard[];
  idList: number;
  lists: IList[];
}

function CardList({ cards, idList, lists }: Props): JSX.Element {
  const { store } = useContext(Context);
  const { id, getList } = useContext(GetListContext);
  const [idMoveCard, setIdMoveCard] = useState(0);
  const [currentPos, setCurrentPos] = useState(0);
  // const [isMove, setIsMove] = useState(false);

  async function saveMove(): Promise<void> {
    await store.moveCardInOneList(idMoveCard, id, lists);
    await getList();
    setIdMoveCard(0);
  }

  return (
    <div
      // onDragOver={(): void => {
      //   setCurrentList(idList);
      // }}
      className={styles.wrap}
    >
      <motion.ul className={styles.cardWrap} variants={ulCard} initial="hidden" animate="show">
        {cards.map((card) => (
          <motion.li
            key={card.id}
            id={card.id.toString()}
            className={cn('card', styles.cardItem, { [styles.move]: currentPos === card.position })}
            variants={listItem}
            draggable
            onDragEnd={(): Promise<void> => saveMove()}
            onDragOver={(): void => {
              store.setCurrentCardPos(card.position);
              setCurrentPos(card.position);
            }}
            onDragStart={(): void => setIdMoveCard(card.id)}
            // drag
            // whileDrag={{ scale: 1.2 }}
          >
            <CardItem startTitle={card.title} idCard={`${card.id}`} idList={idList} />
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

export default observer(CardList);
