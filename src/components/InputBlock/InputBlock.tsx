/* eslint-disable react/require-default-props */
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { IInput } from '../../interfaces/IInput';
import './InputBlock.css';

type Props = {
  inputData: IInput;
};
function InputBlock({ inputData }: Props): JSX.Element {
  return (
    <div className={inputData.cln}>
      <InputGroup>
        <Form.Control
          onChange={inputData.changeHandler}
          onKeyPress={inputData.onKeyPress}
          onKeyUp={inputData.onKeyUp}
          onBlur={inputData.onBlur}
          value={inputData.title}
          type="text"
          placeholder={inputData.ph}
          className={inputData.clni}
          ref={inputData.ref}
        />
      </InputGroup>
    </div>
  );
}

export default observer(InputBlock);
