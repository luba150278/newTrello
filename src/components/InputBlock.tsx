import React from 'react';
import { IAlert } from '../interfaces/IAlert';
import { IInput } from '../interfaces/IInput';
import Alert from './Alert';

type Props = {
  alertState: IAlert;
  inputData: IInput;
};
function InputBlock({ alertState, inputData }: Props): JSX.Element {
  return (
    <div className={inputData.cln}>
      <Alert alertState={alertState} />
      <input
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
    </div>
  );
}

export default InputBlock;
