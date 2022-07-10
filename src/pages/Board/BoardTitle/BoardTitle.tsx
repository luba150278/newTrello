/* eslint-disable no-console */
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { DANGER_NAME } from '../../../common/constans/messages';
import Context from '../../../context/Context';
import getNotify from '../../../functions/notify';
import getSuccessNotify from '../../../functions/sucessNotify';
import { isValidTitle } from '../../../functions/validTitles';
import { IInput } from '../../../interfaces/IInput';
import styles from './BoardTitle.module.css';
import InputBlock from '../../../components/InputBlock/InputBlock';
import DeleteBoard from '../../../components/DeleteBoard/DeleteBoard';

interface Props {
  startTitle: string;
  id: number;
}
function BoardTitle({ startTitle, id }: Props): JSX.Element {
  const { store } = useContext(Context);
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
  const keyPressHandler = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter' && startTitle !== title) {
      if (!checkValid()) {
        getNotify(DANGER_NAME);
        return;
      }
      store.editBoardTitle(title, `${id}`);
      getSuccessNotify('Board was updated!');
    }
  };

  // const keyUpHandler = (): void => {
  //   if (!checkValid()) {
  //     getNotify(DANGER_NAME);
  //     return;
  //   }
  //   store.editBoardTitle(title, `${id}`);
  // };

  const blurHandler = (): void => {
    if (startTitle !== title) {
      if (!checkValid()) {
        getNotify(DANGER_NAME);
        return;
      }
      store.editBoardTitle(title, `${id}`);
    }
  };
  const inputData: IInput = {
    title,
    ph: title,
    changeHandler,
    onKeyPress: keyPressHandler,
    // onKeyUp: keyUpHandler,
    onBlur: blurHandler,
    cln: 'input-row',
    clni: 'h1',
    ref: inputEl,
  };

  return (
    <div className={cn('card', styles.boardHeaderTitle)}>
      <InputBlock inputData={inputData} />
      <DeleteBoard id={id} what="board" />
    </div>
  );
}

export default observer(BoardTitle);
