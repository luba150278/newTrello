/* eslint-disable no-console */
import { motion } from 'framer-motion';
import React from 'react';
import cn from 'classnames';
import { IoMdClose } from 'react-icons/io';
import { CgMoreAlt } from 'react-icons/cg';
import { listItem } from '../../common/constans/motionList';
import styles from './ListMenuMain.module.css';
import Icon from '../Icon/Icon';
import DeleteElement from '../DeleteElement/DeleteElement';

interface Props {
  idList: number;
  toggleListMenu: () => void;
  openSecondMenu: () => void;
  cardsLength: number;
}

function ListMenuMain({ idList, toggleListMenu, openSecondMenu, cardsLength }: Props): JSX.Element {
  return (
    <>
      <motion.li variants={listItem} className={cn(styles.headerMenu, styles.menuItem)} onClick={toggleListMenu}>
        <p>List actions</p>
        <div onClick={toggleListMenu} className={styles.closeMenu}>
          <Icon
            iconChild={<IoMdClose />}
            styles={{
              className: 'icon',
              size: '20',
            }}
          />
        </div>
      </motion.li>
      <motion.li variants={listItem} className={cn(styles.deleteWrap, styles.menuItem)}>
        <DeleteElement isTitle idList={idList} what="list" />
      </motion.li>
      {cardsLength > 1 ? (
        <motion.li variants={listItem} className={cn(styles.sort, styles.menuItem)} onClick={openSecondMenu}>
          <p>Sort by</p>
          <div onClick={openSecondMenu} className={styles.closeMenu}>
            <Icon
              iconChild={<CgMoreAlt />}
              styles={{
                className: 'icon',
                size: '20',
              }}
            />
          </div>
        </motion.li>
      ) : null}
    </>
  );
}

export default ListMenuMain;
