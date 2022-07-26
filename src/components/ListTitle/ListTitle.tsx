import React, { useContext, useEffect, useRef, useState } from 'react';
import { DANGER_NAME } from '../../common/constans/messages';
import Context from '../../context/Context';
import GetListContext from '../../context/GetListContext';
import ListMenuContext from '../../context/ListMenuContext';
import getNotify from '../../functions/notify';
import { isValidTitle } from '../../functions/validTitles';
import { IInput } from '../../interfaces/IInput';
import InputBlock from '../InputBlock/InputBlock';

function ListTitle(): JSX.Element {
  const { store } = useContext(Context);
  const { listTitle, idList, listPosition } = useContext(ListMenuContext);
  const { id, getLists } = useContext(GetListContext);
  const inputEl = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(listTitle);
  useEffect(() => {
    setTitle(listTitle);
  }, [listTitle]);

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
    await store.editListTitle(title, id, listPosition, `${idList}`);
    await getLists();
  }
  const keyPressHandler = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter' && listTitle !== title) {
      update();
    }
  };

  const blurHandler = (): void => {
    if (listTitle !== title) {
      update();
    }
  };
  const inputData: IInput = {
    title,
    ph: title,
    changeHandler,
    onKeyPress: keyPressHandler,
    onBlur: blurHandler,
    cln: 'input-card-row list-title',
    clni: 'h1',
    ref: inputEl,
  };
  return <InputBlock inputData={inputData} />;
}

export default ListTitle;
