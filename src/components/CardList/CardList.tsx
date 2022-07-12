import React from 'react';
import cn from 'classnames';
import { motion } from 'framer-motion';
import { ICard } from '../../interfaces/ICard';
import styles from './CardList.module.css';
import { listItem, ulCard } from '../../common/constans/motionList';
import CardItem from '../CardItem/CardItem';

export interface Props {
  cards: ICard[];
  idList: number;
}

function CardList({ cards, idList }: Props): JSX.Element {
  return (
    <motion.ul className={styles.cardWrap} variants={ulCard} initial="hidden" animate="show">
      {cards.map((card) => (
        <motion.li key={card.id} className={cn('card', styles.cardItem)} variants={listItem}>
          <CardItem startTitle={card.title} idCard={`${card.id}`} idList={idList} />
        </motion.li>
      ))}
    </motion.ul>
  );
}

export default CardList;
