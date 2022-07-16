import React, { useState } from 'react';
import cn from 'classnames';
import { motion } from 'framer-motion';
import styles from './ListMenuWrap.module.css';
import { div } from '../../common/constans/motionList';
import ListMenuMain from '../ListMenuMain/ListMenuMain';
import ListMenuSecond from '../ListMenuSecond/ListMenuSecond';

interface Props {
  isVisible: boolean;
  toggleMenu: () => void;
  idList: number;
  sortCards: (paramSort: number) => void;
  cardsLength: number;
}

function ListMenuWrap({ isVisible, toggleMenu, idList, sortCards, cardsLength }: Props): JSX.Element {
  const [isMainMenu, setIsMainMenu] = useState(true);
  const openSecondMenu = (): void => {
    setIsMainMenu(!isMainMenu);
  };
  return (
    <motion.ul
      className={cn(styles.menuWrap, { [styles.hidden]: !isVisible })}
      variants={div}
      initial="hidden"
      animate={isVisible ? 'show' : 'hidden'}
    >
      {isMainMenu ? (
        <ListMenuMain
          idList={idList}
          toggleMenu={toggleMenu}
          openSecondMenu={openSecondMenu}
          cardsLength={cardsLength}
        />
      ) : (
        <ListMenuSecond idList={idList} toggleMenu={toggleMenu} openSecondMenu={openSecondMenu} sortCards={sortCards} />
      )}
    </motion.ul>
  );
}

export default ListMenuWrap;
