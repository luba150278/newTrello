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
  async function login(): Promise<void> {
    await store.login(store.defaultData.email, store.defaultData.password);
    await store.getBoards();
  }
  const loginPlayground = async (): Promise<void> => {
    await store.loginPlayground();
    await store.getBoards();
  };
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
        <div className={cn(styles.messageWrap, { [styles.hidden]: !isReg })}>
          <div className={styles.loginMessageWrap}>
            <p className={styles.message}>{ALREADY_REG}</p>
            <p onClick={changeIsReg} className={styles.link}>
              Login
            </p>
          </div>
          <p className={styles.link} onClick={loginPlayground}>
            Playground
          </p>
        </div>
        <Button
          variant="primary"
          className={cn(styles.logBtn2, { [styles.hidden]: isReg })}
          onClick={(): Promise<void> => login()}
        >
          Login
        </Button>
      </div>
    </div>
  );
}

export default observer(Buttons);
