/* eslint-disable no-console */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai';
import Icon from '../../../components/Icon/Icon';
import Context from '../../../context/Context';
import { colorGenerator } from '../../../functions/colorGenerator';
import styles from './Boards.module.css';

function Boards(): JSX.Element {
  const { store } = useContext(Context);
  const { boards } = store.boards;
  return (
    <>
      <div className={styles.header}>
        <h1>Boards</h1>
        <div className={styles.sortWrap}>
          <div className={styles.icon} onClick={store.sortBoards}>
            <Icon
              iconChild={<AiOutlineSortAscending />}
              styles={{
                className: 'sort',
                size: '25',
              }}
            />
          </div>
          <div className={styles.icon}>
            <Icon
              iconChild={<AiOutlineSortDescending />}
              styles={{
                className: 'sort',
                size: '25',
              }}
            />
          </div>
        </div>
      </div>

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
