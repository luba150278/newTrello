/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
import { motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { BsCardText } from 'react-icons/bs';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FiCopy } from 'react-icons/fi';
// import { TbUsers } from 'react-icons/tb';
import { VscMove } from 'react-icons/vsc';
import { div, listItem } from '../../common/constans/motionList';
import { CardMoveProvider } from '../../context/CardMoveContext';
import Context from '../../context/Context';
import GetListContext from '../../context/GetListContext';
import ListMenuContext from '../../context/ListMenuContext';
import { ICard } from '../../interfaces/ICard';
import { IconWrapProps } from '../../interfaces/IconWrapProps';
// import Icon from '../Icon/Icon';
import IconWrap from '../IconWrap/IconWrap';
import CardMoveWrap from '../Modal/CardMoveWrap/CardMoveWrap';
import styles from './CardMenu.module.css';

const menuData = [
  { title: 'Open card', icon: <BsCardText /> },
  { title: 'Delete card', icon: <FaRegTrashAlt /> },
  // { title: 'Edit title', icon: <FiEdit3 /> },
  // { title: 'Edit description card', icon: <TbFileDescription /> },
  { title: 'Copy card', icon: <FiCopy /> },
  { title: 'Move card', icon: <VscMove /> },
  // { title: 'Change card users', icon: <TbUsers /> },
];
interface Props {
  card: ICard;
  idList: number;
}
function CardMenu({ card, idList }: Props): JSX.Element {
  const { store } = useContext(Context);
  const { id, getLists } = useContext(GetListContext);
  const { lists, cardsLength } = useContext(ListMenuContext);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = (): void => {
    setShowModal(!showModal);
  };

  function openCard(): void {
    store.setCard(card);
    store.setCurrentListID(idList);
    store.setModal(true);
  }
  async function deleteCard(): Promise<void> {
    await store.deleteCard(id, `${card.id}`, idList, lists);
    await getLists();
  }

  async function copyCard(): Promise<void> {
    await store.addCard(card.title, id, idList, cardsLength + 1);
    await getLists();
  }

  function moveCard(): void {
    setShowModal(true);
  }

  function setClick(variant: number): void {
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
      case 4:
        moveCard();
        break;
      default:
        openCard();
    }
  }
  const cardMoveWrap = (): JSX.Element => (
    <CardMoveProvider value={{ card, idList, toggleModal }}>
      <CardMoveWrap />
    </CardMoveProvider>
  );
  return (
    <div className={styles.cardMenuWrap}>
      <motion.ul className={styles.cardMenuList} variants={div} initial="hidden" animate="show">
        {menuData.map((item, i) => {
          const iconWrapProps: IconWrapProps = {
            iconChild: item.icon,
            iconStyles: {
              className: 'iconCardMenu',
              size: '20',
              title: 'Open card menu',
            },
            className: 'iconWrap',
          };
          return (
            <motion.li
              variants={listItem}
              className={styles.cardMenuItem}
              key={`cardMenu-${i + 1}`}
              onClick={(): void => setClick(i + 1)}
            >
              <IconWrap {...iconWrapProps} />
              <div>{item.title}</div>
            </motion.li>
          );
        })}
      </motion.ul>
      {showModal ? cardMoveWrap() : null}
    </div>
  );
}

export default observer(CardMenu);
