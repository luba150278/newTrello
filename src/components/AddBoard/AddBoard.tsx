import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import { ADD_BOARD } from '../../common/constans/messages';
import Context from '../../context/Context';
import AddBoardInput from '../AddBoardInput/AddBoardInput';
import styles from './AddBoard.module.css';

function AddBoard(): JSX.Element {
  const { store } = useContext(Context);
  const [title, setTitle] = useState<string>('');
  const add = async (): Promise<void> => {
    await store.addBoard(title);
  };

  const findTitle = (newTitle: string): void => {
    setTitle(newTitle);
  };

  return (
    <div className={styles.mainContainer}>
      <AddBoardInput findTitle={findTitle} add={add} />
      <Button variant="primary" className={styles.btnNewBoard} onClick={(): Promise<void> => store.addBoard(title)}>
        {ADD_BOARD}
      </Button>
    </div>
  );
}

export default observer(AddBoard);
