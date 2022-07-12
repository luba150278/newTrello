
import React, { useContext } from 'react';
import cn from 'classnames';
import { Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { ALREADY_REG } from '../../../common/constans/messages';
import Context from '../../../context/Context';
import styles from './Buttons.module.css';

interface IProps {
  isReg: boolean;
  changeIsReg: () => void;
}
function Buttons({ isReg, changeIsReg }: IProps): JSX.Element {
  const { store } = useContext(Context);
  async function xxx(): Promise<void> {
    await store.login(store.defaultData.email, store.defaultData.password);
    await store.getBoards();
  }
  return (
    <div className={styles.buttonWrap}>
      <Button
        variant="danger"
        className={cn(styles.regButt, { [styles.hidden]: !isReg })}
        onClick={(): Promise<void> => store.registration(store.defaultData.email, store.defaultData.password)}
      >
        Registration
      </Button>
      <div className={styles.loginWrap}>
        <p className={cn(styles.message, { [styles.hidden]: !isReg })}>{ALREADY_REG}</p>
        <Button variant="primary" onClick={changeIsReg} className={cn(styles.logBtn1, { [styles.hidden]: !isReg })}>
          Login
        </Button>
        <Button
          variant="primary"
          className={cn(styles.logBtn2, { [styles.hidden]: isReg })}
          onClick={(): Promise<void> => xxx()}
        >
          Login
        </Button>
      </div>
    </div>
  );
}

export default observer(Buttons);
