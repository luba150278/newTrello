import React, { useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { observer } from 'mobx-react-lite';
import Header from './Header/Header';
import Buttons from './Buttons/Buttons';
import Inputs from './Inputs/Inputs';
import styles from './Login.module.css';
import Context from '../../context/Context';

function LoginForm(): JSX.Element {
  const { store } = useContext(Context);
  const [isReg, setIsReg] = useState(false);
  const changeIsReg = (): void => {
    setIsReg(!isReg);
  };
  const loginPlayground = async (): Promise<void> => {
    await store.loginPlayground();
    await store.getBoards();
  };

  return (
    <Container>
      <div className={styles.wrapForm}>
        <Header isReg={isReg} />
        <Inputs isReg={isReg} />
        <Buttons isReg={isReg} changeIsReg={changeIsReg} />
        {!isReg ? (
          <div className={styles.linksWrap}>
            <p className={styles.regOffer} onClick={changeIsReg}>
              Registration
            </p>
            <p className={styles.regOffer} onClick={loginPlayground}>
              Playground
            </p>
          </div>
        ) : null}
      </div>
      <ToastContainer />
    </Container>
  );
}

export default observer(LoginForm);
