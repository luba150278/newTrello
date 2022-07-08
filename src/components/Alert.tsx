/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { IAlert } from '../interfaces/IAlert';

type Props = {
  alertState: IAlert;
};
function Alert({ alertState }: Props): JSX.Element {
  return alertState.isShow ? (
    <div className={alertState.isDanger ? 'alert alert-danger' : 'alert alert-success'} role="alert">
      {alertState.text}
    </div>
  ) : (
    <></>
  );
}

export default Alert;
