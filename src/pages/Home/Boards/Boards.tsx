/* eslint-disable no-console */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../../context/Context';
import { colorGenerator } from '../../../functions/colorGenerator';
import styles from './Boards.module.css';
import BoardsHeader from './BoardsHeader/BoardsHeader';

function Boards(): JSX.Element {
  const { store } = useContext(Context);
  const { boards } = store;
  return (
    <>
      <BoardsHeader />

      <div className={styles.boardsWrap}>
        {boards.map((item) => (
          <Link
            to={`/board/${item.id}`}
            key={item.id}
            className={styles.board}
            style={{ background: `${colorGenerator()}` }}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </>
  );
}

export default Boards;
