import React from 'react';
import styles from './Header.module.css';

interface IProps {
  isReg: boolean;
}
function Header({ isReg }: IProps): JSX.Element {
  return <h1 className={styles.formHeader}>{isReg ? 'Registration' : 'Login'}</h1>;
}

export default Header;
