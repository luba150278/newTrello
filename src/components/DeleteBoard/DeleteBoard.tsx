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
}

function DeleteBoard({ id }: IProps): JSX.Element {
  const history = useNavigate();
  const { store } = useContext(Context);
  return (
    <div
      className={styles.trashDiv}
      onClick={(): void => {
        store.deleteBoard(`${id}`);
        history('/');
      }}
    >
      <Icon iconChild={<FaRegTrashAlt />} styles={{ className: 'icon', size: '20' }} />
    </div>
  );
}

export default observer(DeleteBoard);
