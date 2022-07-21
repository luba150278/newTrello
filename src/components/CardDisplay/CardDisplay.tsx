import React, { useContext, useEffect, useState } from 'react';
import { TbPencil } from 'react-icons/tb';
import { Button, Form } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import styles from './CardDisplay.module.css';
import CardTitle from '../CardTitle/CardTitle';
import Context from '../../context/Context';
import CardDisplayContext from '../../context/CardDisplayContext';
import { IconWrapProps } from '../../interfaces/IconWrapProps';
import IconWrap from '../IconWrap/IconWrap';

const iconWrapProps: IconWrapProps = {
  iconChild: <TbPencil />,
  iconStyles: {
    className: '',
    size: '15',
    title: 'Edit card title',
  },
  className: 'cardDisplayWrap',
};

function CardDisplay(): JSX.Element {
  const { card, listID, lists, id } = useContext(CardDisplayContext);
  const { store } = useContext(Context);
  const [desc, setDescr] = useState(card.description !== '' ? card.description : 'Type your description');

  useEffect(() => {
    setDescr(card.description);
  }, [card.description]);
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => setDescr(event.target.value);

  async function update(): Promise<void> {
    await store.editCardTitle(card.title, id, listID, `${card.id}`, lists);
  }

  return (
    <>
      <div className={styles.cardTitleWrap}>
        <CardTitle card={card} isModal listID={listID} lists={lists} />
        <IconWrap {...iconWrapProps} />
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
