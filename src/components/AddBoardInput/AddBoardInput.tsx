import React, { useState } from 'react';
import { IAddInput } from '../../interfaces/IAddInput';
import { IInput } from '../../interfaces/IInput';
import InputBlock from '../InputBlock/InputBlock';

function AddBoardInput(props: IAddInput): JSX.Element {
  const { findTitle, add } = props;
  const [title, setTitle] = useState('');
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value);
    findTitle(event.target.value);
  };
  const keyPressHandler = async (event: React.KeyboardEvent): Promise<void> => {
    if (event.key === 'Enter') {
      await add();
    }
  };
  const inputData: IInput = {
    title,
    ph: 'Enter board name',
    changeHandler,
    onKeyPress: keyPressHandler,
    cln: 'fields mb-4',
    clni: 'inputName',
    ref: null,
  };
  return <InputBlock inputData={inputData} />;
}

export default AddBoardInput;
