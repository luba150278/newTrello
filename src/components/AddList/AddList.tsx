
import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import Context from '../../context/Context';
import GetListContext from '../../context/GetListContext';
import { IInput } from '../../interfaces/IInput';
import InputBlock from '../InputBlock/InputBlock';
import styles from './AddList.module.css';

export interface Props {
  position: number;
}

function AddList({ position }: Props): JSX.Element {
  const { store } = useContext(Context);
  const { id, getList } = useContext(GetListContext);
  const [title, setTitle] = useState('');
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => setTitle(event.target.value);

  async function add(): Promise<void> {
    await store.addList(title, id, position);
    await getList();
  }
  const keyPressHandler = async (event: React.KeyboardEvent): Promise<void> => {
    if (event.key === 'Enter') {
      await add();
    }
  };

  const inputData: IInput = {
    title,
    ph: 'Enter list name',
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
          Add a new list
        </Button>
      </div>
      {position !== 0 ? <div className={styles.listNumber}>The number of lists is {position}</div> : null}
    </div>
  );
}

export default observer(AddList);
