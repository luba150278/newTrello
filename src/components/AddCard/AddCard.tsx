import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import Context from '../../context/Context';
import GetListContext from '../../context/GetListContext';
import { IAddCard } from '../../interfaces/IAddCard';
import AddCardInput from '../AddCardInput/AddCardInput';
import styles from './AddCard.module.css';

function AddCard(props: IAddCard): JSX.Element {
  const { position, idList } = props;
  const { store } = useContext(Context);
  const { id, getLists } = useContext(GetListContext);
  const [title, setTitle] = useState('');

  const add = async (): Promise<void> => {
    await store.addCard(title, id, idList, position);
    await getLists();
  };

  const findTitle = (newTitle: string): void => {
    setTitle(newTitle);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.addPanel}>
        <AddCardInput findTitle={findTitle} add={add} />
        <Button variant="primary" onClick={async (): Promise<void> => add()}>
          Add a new card
        </Button>
      </div>
    </div>
  );
}

export default observer(AddCard);
