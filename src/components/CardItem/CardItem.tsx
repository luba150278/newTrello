import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { DANGER_NAME } from '../../common/constans/messages';
import Context from '../../context/Context';
import GetListContext from '../../context/GetListContext';
import getNotify from '../../functions/notify';
import { isValidTitle } from '../../functions/validTitles';
import { IInput } from '../../interfaces/IInput';
import DeleteElement from '../DeleteElement/DeleteElement';
import InputBlock from '../InputBlock/InputBlock';
import styles from './CardItem.module.css';

export interface Props {
  startTitle: string;
  idCard: string;
  idList: number;
}

function CardItem({ startTitle, idCard, idList }: Props): JSX.Element {
  const { store } = useContext(Context);
  const { id, getList } = useContext(GetListContext);
  const inputEl = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(startTitle);
  useEffect(() => {
    setTitle(startTitle);
  }, [startTitle]);

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
    await store.editCardTitle(title, id, idList, idCard);
    await getList();
  }
  const keyPressHandler = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter' && startTitle !== title) {
      update();
    }
  };

  const blurHandler = (): void => {
    if (startTitle !== title) {
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
    clni: 'h1 cardData',
    ref: inputEl,
  };
  return (
    <div className={styles.cardWrap}>
      <InputBlock inputData={inputData} />
      <DeleteElement what="card" idCard={idCard} />
    </div>
  );
}

export default observer(CardItem);
