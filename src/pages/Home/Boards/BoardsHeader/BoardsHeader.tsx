import React, { useContext, useState } from 'react';
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai';
import Icon from '../../../../components/Icon/Icon';
import Context from '../../../../context/Context';
import styles from './BoardsHeader.module.css';

function BoardsHeader(): JSX.Element {
  const { store } = useContext(Context);
  const { boards } = store;
  const [click, setClick] = useState(0);
  return (
    <div className={styles.header}>
      <h1>Boards</h1>
      <div className={styles.sortWrap}>
        <div
          className={styles.icon}
          onClick={(): void => {
            store.sortBoards(boards);
            setClick(1);
          }}
        >
          <Icon
            iconChild={<AiOutlineSortAscending />}
            styles={{
              className: click === 1 ? 'sort active' : 'sort',
              size: '25',
            }}
            isToolTip={false}
            toolTipText=""
          />
        </div>
        <div
          className={styles.icon}
          onClick={(): void => {
            store.sortDescBoards(boards);
            setClick(2);
          }}
        >
          <Icon
            iconChild={<AiOutlineSortDescending />}
            styles={{
              className: click === 2 ? 'sort active' : 'sort',
              size: '25',
            }}
            isToolTip={false}
            toolTipText=""
          />
        </div>
      </div>
    </div>
  );
}

export default BoardsHeader;
