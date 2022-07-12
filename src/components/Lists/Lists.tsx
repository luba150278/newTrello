
import { observer } from 'mobx-react-lite';
import React from 'react';
import cn from 'classnames';
import { motion } from 'framer-motion';
import { IList } from '../../interfaces/ILists';
import styles from './Lists.module.css';
import ListItem from '../ListItem/ListItem';

export interface Props {
  lists: IList[];
}
const ul = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const li = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};
function Lists({ lists }: Props): JSX.Element {
  if (lists.length === 0) {
    return <h2>Any lists yet</h2>;
  }

  return (
    <motion.ul className={styles.lists} variants={ul} initial="hidden" animate="show">
      {lists.map((item) => (
        <motion.li className={cn('card', styles.listItem)} key={item.id} variants={li}>
          <ListItem item={item} />
        </motion.li>
      ))}
    </motion.ul>
  );
}

export default observer(Lists);
