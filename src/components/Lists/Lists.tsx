/* eslint-disable no-console */
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import React from 'react';
import { motion } from 'framer-motion';
import { IList } from '../../interfaces/ILists';
import styles from './Lists.module.css';
import DeleteBoard from '../DeleteBoard/DeleteBoard';
import ListTitle from '../ListTitle/ListTitle';

export interface Props {
  lists: IList[];
  id: number;
  getList: () => Promise<void>;
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
function Lists({ lists, id, getList }: Props): JSX.Element {
  if (lists.length === 0) {
    return <h2>Any lists yet</h2>;
  }
  return (
    <motion.ul className={styles.lists} variants={ul} initial="hidden" animate="show">
      {lists.map((item) => (
        <motion.li className={cn('card', styles.listItem)} key={item.id} variants={li}>
          <div className={styles.listTitle}>
            <ListTitle id={id} startTitle={item.title} idList={item.id} pos={item.position} getList={getList} />
            <DeleteBoard id={id} what="list" idList={item.id} getList={getList} />
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
}

export default observer(Lists);
