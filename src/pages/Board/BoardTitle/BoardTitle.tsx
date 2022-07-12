
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { DANGER_NAME, EDIT_BOARD } from '../../../common/constans/messages';
import Context from '../../../context/Context';
import getNotify from '../../../functions/notify';
import getSuccessNotify from '../../../functions/sucessNotify';
import { isValidTitle } from '../../../functions/validTitles';
import { IInput } from '../../../interfaces/IInput';
import styles from './BoardTitle.module.css';
import InputBlock from '../../../components/InputBlock/InputBlock';
import DeleteElement from '../../../components/DeleteElement/DeleteElement';
import GetListContext from '../../../context/GetListContext';

interface Props {
  startTitle: string;
}
function BoardTitle({ startTitle }: Props): JSX.Element {
  const { store } = useContext(Context);
  const { id } = useContext(GetListContext);
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
      store.editBoardTitle(title, id);
      getSuccessNotify(EDIT_BOARD);
    }
  };

  const blurHandler = (): void => {
    if (startTitle !== title) {
      if (!checkValid()) {
        getNotify(DANGER_NAME);
        return;
      }
      store.editBoardTitle(title, id);
    }
  };
  const inputData: IInput = {
    title,
    ph: title,
    changeHandler,
    onKeyPress: keyPressHandler,
    onBlur: blurHandler,
    cln: 'input-row',
    clni: 'h1',
    ref: inputEl,
  };

  return (
    <div className={cn('card', styles.boardHeaderTitle)}>
      <InputBlock inputData={inputData} />
      <DeleteElement what="board" />
    </div>
  );
}

export default observer(BoardTitle);
