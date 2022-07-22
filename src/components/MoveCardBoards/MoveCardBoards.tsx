/* eslint-disable react/jsx-no-useless-fragment */
import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import Context from '../../context/Context';
import GetListContext from '../../context/GetListContext';
import { IBoard } from '../../interfaces/IBoard';
import MoveCardLists from '../MoveCardLists/MoveCardLists';
import styles from './MoveCardBoards.module.css';

function MoveCardBoards(): JSX.Element {
  const { store } = useContext(Context);
  const { boards } = store;
  if (boards.length === 0) {
    return <></>;
  }

  const { id } = useContext(GetListContext);
  const [idBoard, setID] = useState(id);

  return (
    <div className={styles.wrap}>
      <h5 className={styles.h5}>Board:</h5>
      <Form.Select
        className={styles.selectList}
        onChange={(e): void => {
          setID(e.target.value);
        }}
        defaultValue={idBoard}
      >
        {boards.map((item: IBoard) => (
          <option key={item.id} value={item.id} className={styles.selectOption}>
            {item.title}
          </option>
        ))}
      </Form.Select>
      <MoveCardLists idBoardTo={idBoard} idBoardFrom={id} />
    </div>
  );
}

export default observer(MoveCardBoards);
