/* eslint-disable react/no-array-index-key */
import { motion } from 'framer-motion';
import React, { useContext } from 'react';
import { BiSortDown, BiSortUp } from 'react-icons/bi';
import { IoMdClose, IoIosArrowBack } from 'react-icons/io';
import { listItem } from '../../common/constans/motionList';
import styles from './ListMenuSecond.module.css';
import Icon from '../Icon/Icon';
import ListMenuContext from '../../context/ListMenuContext';

interface Props {
  openSecondMenu: () => void;
}
interface IData {
  title: string;
  icon: JSX.Element;
}

const dataList: IData[] = [
  { title: 'Sort by title (ascending)', icon: <BiSortDown /> },
  { title: 'Sort by title (descending)', icon: <BiSortUp /> },
  { title: 'Sort by position (ascending)', icon: <BiSortDown /> },
  { title: 'Sort by position (descending)', icon: <BiSortUp /> },
  { title: 'Sort by date (ascending)', icon: <BiSortDown /> },
  { title: 'Sort by date (descending)', icon: <BiSortUp /> },
];

function ListMenuSecond({ openSecondMenu }: Props): JSX.Element {
  const { idList, toggleListMenu, sortCards } = useContext(ListMenuContext);
  return (
    <>
      <motion.li variants={listItem} className={styles.menuItem} key={`${idList}-0`}>
        <div onClick={openSecondMenu} className={styles.iconWrap}>
          <Icon
            iconChild={<IoIosArrowBack />}
            styles={{
              className: 'icon',
              size: '20',
            }}
          />
        </div>
        Sorting
        <div
          onClick={(): void => {
            openSecondMenu();
            toggleListMenu();
          }}
          className={styles.iconWrap}
        >
          <Icon
            iconChild={<IoMdClose />}
            styles={{
              className: 'icon',
              size: '20',
            }}
          />
        </div>
      </motion.li>
      {dataList.map((item: IData, i) => (
        <motion.li
          variants={listItem}
          className={styles.menuItem}
          key={`${idList}-${i + 1}`}
          onClick={(): void => {
            sortCards(i);
            openSecondMenu();
            toggleListMenu();
          }}
        >
          <div>{item.title}</div>
          <div className={styles.iconWrap}>
            <Icon
              iconChild={item.icon}
              styles={{
                className: 'icon',
                size: '20',
              }}
            />
          </div>
        </motion.li>
      ))}
    </>
  );
}

export default ListMenuSecond;
