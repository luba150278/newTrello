
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import Header from './Header/Header';
import Buttons from './Buttons/Buttons';
import Inputs from './Inputs/Inputs';
import styles from './Login.module.css';

function LoginForm(): JSX.Element {
  const [isReg, setIsReg] = useState(false);
  const changeIsReg = (): void => {
    setIsReg(!isReg);
  };

  return (
    <Container>
      <div className={styles.wrapForm}>
        <Header isReg={isReg} />
        <Inputs isReg={isReg} />
        <Buttons isReg={isReg} changeIsReg={changeIsReg} />
        {!isReg ? (
          <p className={styles.regOffer} onClick={changeIsReg}>
            Registration
          </p>
        ) : null}
      </div>
      <ToastContainer />
    </Container>
  );
}

export default LoginForm;
