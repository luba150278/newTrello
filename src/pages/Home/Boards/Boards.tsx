/* eslint-disable no-console */
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ModalWrapper from '../../../components/Modal/ModalWrapper';
import Context from '../../../context/Context';
import { colorGenerator } from '../../../functions/colorGenerator';
import styles from './Boards.module.css';
import BoardsHeader from './BoardsHeader/BoardsHeader';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const listItem = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};
function Boards(): JSX.Element {
  const { store } = useContext(Context);
  const { boards } = store;

  return (
    <>
      <BoardsHeader />

      <motion.ul className={styles.boardsWrap} variants={container} initial="hidden" animate="show">
        {boards.map((item) => (
          <motion.li key={item.id} variants={listItem}>
            <Link to={`/board/${item.id}`} className={styles.board} style={{ background: `${colorGenerator()}` }}>
              {item.title}
            </Link>
          </motion.li>
        ))}
      </motion.ul>

      <ModalWrapper
        isCard={false}
        card={{
          id: 0,
          position: 0,
          title: '',
          description: '',
          users: [0],
        }}
      />
    </>
  );
}

export default observer(Boards);
