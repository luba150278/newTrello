import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import Context from '../../context/Context';
import GetListContext from '../../context/GetListContext';
import AddListInput from '../AddListInput/AddListInput';
import styles from './AddList.module.css';

export interface Props {
  position: number;
}

function AddList({ position }: Props): JSX.Element {
  const { store } = useContext(Context);
  const { id, getLists } = useContext(GetListContext);
  const [title, setTitle] = useState('');

  const add = async (): Promise<void> => {
    await store.addList(title, id, position);
    await getLists();
  };

  const findTitle = (newTitle: string): void => {
    setTitle(newTitle);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.addPanel}>
        <AddListInput findTitle={findTitle} add={add} />
        <Button variant="primary" onClick={async (): Promise<void> => add()}>
          Add a new list
        </Button>
      </div>
      {position !== 0 ? <div className={styles.listNumber}>The number of lists is {position}</div> : null}
    </div>
  );
}

export default observer(AddList);
