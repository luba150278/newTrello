/* eslint-disable no-console */
import React, { useContext, useEffect, useState } from 'react';
import { TbPencil } from 'react-icons/tb';
import { Button, Form } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import styles from './CardDisplay.module.css';
import { ICard } from '../../interfaces/ICard';
import CardTitle from '../CardTitle/CardTitle';
import Icon from '../Icon/Icon';
import { IList } from '../../interfaces/ILists';
import Context from '../../context/Context';

type Props = {
  card: ICard;
  listID: number;
  lists: IList[];
  id: string;
};
function CardDisplay({ card, listID, lists, id }: Props): JSX.Element {
  // const desc = card.description !== '' ? card.description : 'Type your description';
  const { store } = useContext(Context);
  const [desc, setDescr] = useState(card.description !== '' ? card.description : 'Type your description');

  useEffect(() => {
    setDescr(card.description);
  }, [card.description]);
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => setDescr(event.target.value);

  async function update(): Promise<void> {
    await store.editCardTitle(card.title, id, listID, `${card.id}`, lists);
    // await getLists();
  }
  return (
    <>
      <div className={styles.cardTitleWrap}>
        <CardTitle card={card} isModal listID={listID} lists={lists} />
        <div className={styles.iconWrap}>
          <Icon
            iconChild={<TbPencil />}
            styles={{
              className: '',
              size: '15',
              title: 'Edit card title',
            }}
          />
        </div>
      </div>
      <Form.Group className={styles.inputWrapp} controlId={`card-text-area-${card.id}`}>
        <Form.Label className={styles.label}>Description</Form.Label>
        <Form.Control as="textarea" rows={5} defaultValue={desc} onChange={changeHandler} />
      </Form.Group>
      <Button variant="primary" className={styles.button} onClick={(): Promise<void> => update()}>
        Save
      </Button>
    </>
  );
}

export default observer(CardDisplay);
