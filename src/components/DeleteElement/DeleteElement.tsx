/* eslint-disable react/require-default-props */

import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import cn from 'classnames';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Context from '../../context/Context';
import Icon from '../Icon/Icon';
import styles from './DeleteElement.module.css';
import GetListContext from '../../context/GetListContext';

export interface IProps {
  what: 'board' | 'list' | 'card';
  idList?: number;
  idCard?: string;
}

function DeleteElement({ what, idList = 0, idCard = '' }: IProps): JSX.Element {
  const history = useNavigate();
  const { store } = useContext(Context);
  const { id, getList } = useContext(GetListContext);

  async function deleteList(): Promise<void> {
    await store.deleteList(id, `${idList}`);
    await getList();
  }

  async function deleteCard(): Promise<void> {
    await store.deleteCard(id, idCard);
    await getList();
  }

  return (
    <div
      className={cn(styles.trashDiv, { [styles.trashCard]: what === 'list' })}
      onClick={async (): Promise<void> => {
        if (what === 'board') {
          store.deleteBoard(id);
          history('/');
        }
        if (what === 'list') {
          await deleteList();
        }
        if (what === 'card') {
          await deleteCard();
        }
      }}
    >
      <Icon iconChild={<FaRegTrashAlt />} styles={{ className: 'icon deleteIcon', size: '15' }} />
    </div>
  );
}

export default observer(DeleteElement);
