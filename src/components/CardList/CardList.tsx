import React, { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import { motion, useAnimation } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { useInView } from 'react-intersection-observer';
import styles from './CardList.module.css';
import { listItem, ulCard } from '../../common/constans/motionList';
import CardItem from '../CardItem/CardItem';
import GetListContext from '../../context/GetListContext';
import Context from '../../context/Context';
import ListMenuContext from '../../context/ListMenuContext';
import { CardItemProps } from '../../interfaces/CardItemProps';

function CardList(): JSX.Element {
  const { store } = useContext(Context);
  const { cards, idList, lists } = useContext(ListMenuContext);
  const { id, getLists } = useContext(GetListContext);
  const [idMoveCard, setIdMoveCard] = useState(0);
  const [currentPos, setCurrentPos] = useState(0);
  const [showCardId, setShowCardId] = useState('0');

  const openMenu = (idCard: string, listId: number): void => {
    if (listId === idList) setShowCardId(idCard);
  };

  async function saveMove(): Promise<void> {
    await store.moveCardHandle(idMoveCard, id, lists);
    await getLists();
    setIdMoveCard(0);
  }

  const control = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      control.start('visible');
    } else {
      control.start('hidden');
    }
  }, [control, inView]);

  return (
    <div className={styles.wrap}>
      <motion.ul className={styles.cardWrap} variants={ulCard} initial="hidden" animate="show" ref={ref}>
        {cards.map((card) => {
          const cardItemProps: CardItemProps = {
            card,
            showMenu: showCardId === `${card.id}`,
            openMenu,
          };
          return (
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
            >
              <CardItem {...cardItemProps} />
            </motion.li>
          );
        })}
      </motion.ul>
    </div>
  );
}

export default observer(CardList);
