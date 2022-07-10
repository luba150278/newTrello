/* eslint-disable react/require-default-props */
/* eslint-disable no-console */
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Context from '../../context/Context';
import Icon from '../Icon/Icon';
import styles from './DeleteBoard.module.css';

export interface IProps {
  id: number;
  what: 'board' | 'list' | 'card';
  idList?: number;
  getList?: () => Promise<void>;
}

function DeleteBoard({ id, what, idList = 0, getList }: IProps): JSX.Element {
  const history = useNavigate();
  const { store } = useContext(Context);

  async function deleteList(): Promise<void> {
    await store.deleteList(`${id}`, `${idList}`);
    if (getList) await getList();
  }

  return (
    <div
      className={styles.trashDiv}
      onClick={async (): Promise<void> => {
        if (what === 'board') {
          store.deleteBoard(`${id}`);
          history('/');
        }
        if (what === 'list') {
          await deleteList();
        }
      }}
    >
      <Icon iconChild={<FaRegTrashAlt />} styles={{ className: 'icon', size: '20' }} />
    </div>
  );
}

export default observer(DeleteBoard);
