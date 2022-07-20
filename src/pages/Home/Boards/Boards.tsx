import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { colorGenerator } from '../../../functions/colorGenerator';
import styles from './Boards.module.css';
import BoardsHeader from './BoardsHeader/BoardsHeader';
import { IBoard } from '../../../interfaces/IBoard';
import { listItem, ul } from '../../../common/constans/motionList';
import { NO_BOARDS } from '../../../common/constans/messages';
import ModalWrapper from '../../../components/Modal/BoardModal/ModalWrapper';

interface Props {
  boards: IBoard[];
}
function Boards({ boards }: Props): JSX.Element {
  return (
    <>
      <BoardsHeader />
      {boards.length === 0 ? <h1>{NO_BOARDS}</h1> : null}
      <motion.ul className={styles.boardsWrap} variants={ul} initial="hidden" animate="show">
        {boards.map((item) => (
          <motion.li key={item.id} variants={listItem}>
            <Link to={`/board/${item.id}`} className={styles.board} style={{ background: `${colorGenerator()}` }}>
              {item.title}
            </Link>
          </motion.li>
        ))}
      </motion.ul>

      <ModalWrapper isCard={false} />
    </>
  );
}

export default observer(Boards);
