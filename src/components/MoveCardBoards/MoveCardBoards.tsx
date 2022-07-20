/* eslint-disable no-console */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { IBoard } from '../../interfaces/IBoard';
import { ICard } from '../../interfaces/ICard';
import MoveCardLists from '../MoveCardLists/MoveCardLists';
import styles from './MoveCardBoards.module.css';

interface Props {
  boards: IBoard[];
  boardID: string;
  card: ICard;
  idList: number;
}

function MoveCardBoards({ boards, boardID, card, idList }: Props): JSX.Element {
  if (boards.length === 0) {
    return <></>;
  }
  const [id, setID] = useState(boardID);

  return (
    <div className={styles.wrap}>
      <h5 className={styles.h5}>Board:</h5>
      <Form.Select
        className={styles.selectList}
        onChange={(e): void => {
          setID(e.target.value);
        }}
        defaultValue={id}
      >
        {boards.map((item: IBoard) => (
          <option key={item.id} value={item.id} className={styles.selectOption}>
            {item.title}
          </option>
        ))}
      </Form.Select>
      <MoveCardLists id={id} card={card} idList={idList} idBoardFrom={boardID} />
    </div>
  );
}

export default MoveCardBoards;
