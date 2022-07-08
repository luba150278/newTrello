import React from 'react';
import { ICard } from '../../interfaces/ICard';

type Props = {
  card: ICard;
};
function CardDisplay({ card }: Props): JSX.Element {
  const desc = card.description !== '' ? card.description : 'Type your description';
  const cln = card.description !== '' ? 'textArea' : 'textArea empty';
  return (
    <div>
      <label>Description</label>
      <textarea defaultValue={desc} className={cln} />
    </div>
  );
}

export default CardDisplay;
