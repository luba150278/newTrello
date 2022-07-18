/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
import { motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { BsCardText } from 'react-icons/bs';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FiCopy } from 'react-icons/fi';
import { TbUsers } from 'react-icons/tb';
import { VscMove } from 'react-icons/vsc';
import { div, listItem } from '../../common/constans/motionList';
import Context from '../../context/Context';
import GetListContext from '../../context/GetListContext';
import ListMenuContext from '../../context/ListMenuContext';
import { ICard } from '../../interfaces/ICard';
import Icon from '../Icon/Icon';
import styles from './CardMenu.module.css';

const menuData = [
  { title: 'Open card', icon: <BsCardText /> },
  { title: 'Delete card', icon: <FaRegTrashAlt /> },
  // { title: 'Edit title', icon: <FiEdit3 /> },
  // { title: 'Edit description card', icon: <TbFileDescription /> },
  { title: 'Copy card', icon: <FiCopy /> },
  { title: 'Move card', icon: <VscMove /> },
  { title: 'Change card users', icon: <TbUsers /> },
];
interface Props {
  card: ICard;
  idList: number;
}
function CardMenu({ card, idList }: Props): JSX.Element {
  const { store } = useContext(Context);
  const { id, getLists } = useContext(GetListContext);
  const { lists, cardsLength } = useContext(ListMenuContext);

  const openCard = (): void => {
    store.setCard(card);
    store.setCurrentListID(idList);
    store.setModal(true);
  };
  const deleteCard = async (): Promise<void> => {
    await store.deleteCard(id, `${card.id}`, idList, lists);
    await getLists();
  };
  const copyCard = async (): Promise<void> => {
    await store.addCard(card.title, id, idList, cardsLength + 1);
    await getLists();
  };
  const setClick = (variant: number): void => {
    switch (variant) {
      case 1:
        openCard();
        break;
      case 2:
        deleteCard();
        break;
      case 3:
        copyCard();
        break;
      default:
        openCard();
    }
  };
  return (
    <div className={styles.cardMenuWrap}>
      <motion.ul className={styles.cardMenuList} variants={div} initial="hidden" animate="show">
        {menuData.map((item, i) => (
          <motion.li
            variants={listItem}
            className={styles.cardMenuItem}
            key={`cardMenu-${i + 1}`}
            onClick={(): void => setClick(i + 1)}
          >
            <div className={styles.iconWrap}>
              <Icon
                iconChild={item.icon}
                styles={{
                  className: 'iconCardMenu',
                  size: '20',
                }}
              />
            </div>
            <div>{item.title}</div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

export default observer(CardMenu);
