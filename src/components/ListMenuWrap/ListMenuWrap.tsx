import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { motion } from 'framer-motion';
import styles from './ListMenuWrap.module.css';
import { div } from '../../common/constans/motionList';
import ListMenuMain from '../ListMenuMain/ListMenuMain';
import ListMenuSecond from '../ListMenuSecond/ListMenuSecond';
import ListMenuContext from '../../context/ListMenuContext';

function ListMenuWrap(): JSX.Element {
  const { showListMenu, toggleListMenu } = useContext(ListMenuContext);
  const [isMainMenu, setIsMainMenu] = useState(true);
  const openSecondMenu = (): void => {
    setIsMainMenu(!isMainMenu);
  };
  return (
    <motion.ul
      className={cn(styles.menuWrap, { [styles.hidden]: !showListMenu })}
      variants={div}
      initial="hidden"
      animate={showListMenu ? 'show' : 'hidden'}
    >
      {isMainMenu ? (
        <ListMenuMain toggleListMenu={toggleListMenu} openSecondMenu={openSecondMenu} />
      ) : (
        <ListMenuSecond openSecondMenu={openSecondMenu} />
      )}
    </motion.ul>
  );
}

export default ListMenuWrap;
