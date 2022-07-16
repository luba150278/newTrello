import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import Context from '../../context/Context';
import GetListContext from '../../context/GetListContext';
import { IInput } from '../../interfaces/IInput';
import InputBlock from '../InputBlock/InputBlock';
import styles from './AddCard.module.css';

export interface Props {
  position: number;
  idList: number;
}

function AddCard({ position, idList }: Props): JSX.Element {
  const { store } = useContext(Context);
  const { id, getLists } = useContext(GetListContext);
  const [title, setTitle] = useState('');
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => setTitle(event.target.value);

  async function add(): Promise<void> {
    await store.addCard(title, id, idList, position);
    await getLists();
  }
  const keyPressHandler = async (event: React.KeyboardEvent): Promise<void> => {
    if (event.key === 'Enter') {
      await add();
    }
  };

  const inputData: IInput = {
    title,
    ph: 'Enter card name',
    changeHandler,
    onKeyPress: keyPressHandler,
    cln: '',
    clni: 'inputName',
    ref: null,
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.addPanel}>
        <InputBlock inputData={inputData} />
        <Button variant="primary" onClick={async (): Promise<void> => add()}>
          Add a new card
        </Button>
      </div>
    </div>
  );
}

export default observer(AddCard);
