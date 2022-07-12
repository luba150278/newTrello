
import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai';
import { RiAddCircleLine } from 'react-icons/ri';
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
          className={styles.iconDiv}
          onClick={(): void => {
            store.sortBoards(boards);
            setClick(1);
          }}
        >
          <Icon
            iconChild={<AiOutlineSortAscending />}
            styles={{
              className: click === 1 ? 'icon active' : 'icon',
              size: '25',
            }}
          />
        </div>
        <div
          className={styles.iconDiv}
          onClick={(): void => {
            store.sortDescBoards(boards);
            setClick(2);
          }}
        >
          <Icon
            iconChild={<AiOutlineSortDescending />}
            styles={{
              className: click === 2 ? 'icon active' : 'icon',
              size: '25',
            }}
            isToolTip={false}
            toolTipText=""
          />
        </div>
      </div>
      <div className={styles.addBoardWrapp} onClick={(): void => store.setModal(true)}>
        <Icon
          iconChild={<RiAddCircleLine />}
          styles={{
            className: 'icon',
            size: '25',
          }}
          isToolTip
          toolTipText="Add a new board"
          toolTipPlace="top"
        />
      </div>
    </div>
  );
}

export default observer(BoardsHeader);
