/* eslint-disable no-console */
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ModalWrapper from '../../../components/Modal/ModalWrapper';
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
