/* eslint-disable no-console */
/* eslint-disable react/require-default-props */
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { DANGER_NAME } from '../../common/constans/messages';
import Context from '../../context/Context';
import GetListContext from '../../context/GetListContext';
import ListMenuContext from '../../context/ListMenuContext';
import getNotify from '../../functions/notify';
import { isValidTitle } from '../../functions/validTitles';
import { ICard } from '../../interfaces/ICard';
import { IInput } from '../../interfaces/IInput';
import { IList } from '../../interfaces/ILists';
import InputBlock from '../InputBlock/InputBlock';

interface Props {
  card: ICard;
  isModal?: boolean;
  listID?: number;
  lists?: IList[];
}
function CardTitle({ card, isModal = false, listID = 0, lists = [] }: Props): JSX.Element {
  const { store } = useContext(Context);
  const { idList } = useContext(ListMenuContext);
  const { id, getLists } = useContext(GetListContext);
  const inputEl = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(store.card.title);

  useEffect(() => {
    setTitle(card.title);
  }, [card.title]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => setTitle(event.target.value);

  function checkValid(): boolean {
    const validTitle = isValidTitle(title);
    return validTitle;
  }
  async function update(): Promise<void> {
    if (!checkValid()) {
      getNotify(DANGER_NAME);
      return;
    }
    await store.editCardTitle(title, id, idList === 0 ? listID : idList, `${card.id}`, lists);
    await getLists();
  }
  const keyPressHandler = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter' && card.title !== title) {
      update();
    }
  };

  const blurHandler = (): void => {
    if (card.title !== title) {
      update();
    }
  };
  const inputData: IInput = {
    title,
    ph: title,
    changeHandler,
    onKeyPress: keyPressHandler,
    onBlur: blurHandler,
    cln: 'input-card-row cardTitle',
    clni: isModal ? 'h1 cardDataModal' : 'h1 cardData',
    ref: inputEl,
  };
  return <InputBlock inputData={inputData} />;
}

export default observer(CardTitle);
