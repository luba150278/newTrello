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
import ListMenuContext from '../../context/ListMenuContext';

export interface IProps {
  what: 'board' | 'list' | 'card';
  idList?: number;
  idCard?: string;
  isTitle?: boolean;
}

function DeleteElement({ isTitle = false, what, idList = 0, idCard = '' }: IProps): JSX.Element {
  const history = useNavigate();
  const { store } = useContext(Context);
  const { id, getLists } = useContext(GetListContext);
  const { lists } = useContext(ListMenuContext);

  async function deleteList(): Promise<void> {
    await store.deleteList(id, `${idList}`);
    await getLists();
  }

  async function deleteCard(): Promise<void> {
    await store.deleteCard(id, idCard, idList, lists);
    await getLists();
  }

  async function deleteWrap(): Promise<void> {
    if (what === 'board') {
      await store.deleteBoard(id);
      history('/');
    }
    if (what === 'list') {
      await deleteList();
    }
    if (what === 'card') {
      await deleteCard();
    }
  }

  return (
    <div
      className={cn(styles.trashDiv, { [styles.trashCard]: what === 'list', [styles.trashWithTitle]: isTitle })}
      onClick={async (): Promise<void> => deleteWrap()}
    >
      {isTitle ? <p>Delete</p> : null}
      <Icon iconChild={<FaRegTrashAlt />} styles={{ className: 'icon deleteIcon', size: '15' }} />
    </div>
  );
}

export default observer(DeleteElement);
