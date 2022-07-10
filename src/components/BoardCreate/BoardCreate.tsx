/* eslint-disable no-console */
import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import { ADD_BOARD } from '../../common/constans/messages';
import Context from '../../context/Context';
import { IInput } from '../../interfaces/IInput';
import InputBlock from '../InputBlock/InputBlock';
import styles from './BoardCreate.module.css';
// import 'react-toastify/dist/ReactToastify.css';

function BoardCreate(): JSX.Element {
  const { store } = useContext(Context);
  const [title, setTitle] = useState<string>('');
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => setTitle(event.target.value);

  const keyPressHandler = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') {
      store.addBoard(title);
    }
  };

  const inputData: IInput = {
    title,
    ph: 'Enter board name',
    changeHandler,
    onKeyPress: keyPressHandler,
    cln: 'fields mb-4',
    clni: 'inputName',
    ref: null,
  };
  return (
    <div className={styles.mainContainer}>
      <InputBlock inputData={inputData} />

      <Button variant="primary" className={styles.btnNewBoard} onClick={(): Promise<void> => store.addBoard(title)}>
        {ADD_BOARD}
      </Button>
    </div>
  );
}

export default observer(BoardCreate);
