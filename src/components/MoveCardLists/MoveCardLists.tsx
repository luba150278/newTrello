/* eslint-disable no-console */
/* eslint-disable react/jsx-no-useless-fragment */
import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import CardMoveContext from '../../context/CardMoveContext';
import Context from '../../context/Context';
import GetListContext from '../../context/GetListContext';
import { IList } from '../../interfaces/ILists';
import styles from './MoveCardLists.module.css';

interface Props {
  idBoardTo: string;
  idBoardFrom: string;
}

function MoveCardLists({ idBoardTo, idBoardFrom }: Props): JSX.Element {
  const { store } = useContext(Context);
  const { getLists } = useContext(GetListContext);
  const { listArr } = store;
  const { idList, card } = useContext(CardMoveContext);
  const lists = Object.values(listArr.filter((item) => item.boardID === Number(idBoardTo))[0].lists).filter(
    (item) => item.id !== idList
  );
  if (lists.length === 0) {
    return <p>No Lists</p>;
  }
  const [idListSelect, setIDList] = useState(lists[0].id);
  async function clickHandler(): Promise<void> {
    await store.moveCardFromWrap(idBoardFrom, card.id, listArr, idList, idListSelect, Number(idBoardTo));
    await getLists();
  }
  return (
    <div className={styles.wrap}>
      <h5 className={styles.h5}>Lists:</h5>
      <Form.Select
        className={styles.selectList}
        onChange={(e): void => {
          setIDList(Number(e.target.value));
        }}
        defaultValue={idListSelect}
      >
        {lists.map((item: IList) => (
          <option key={item.id} value={item.id} className={styles.selectOption}>
            {item.title}
          </option>
        ))}
      </Form.Select>
      <Button onClick={(): Promise<void> => clickHandler()}>Move Card</Button>
    </div>
  );
}

export default observer(MoveCardLists);
