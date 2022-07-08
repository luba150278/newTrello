import { observer } from 'mobx-react-lite';
import React, { ReactNode, useContext } from 'react';
import Context from '../../context/Context';
import styles from './Modal.module.css';

interface ModalProps {
  children: ReactNode;
}

function Modal({ children }: ModalProps): JSX.Element {
  const { store } = useContext(Context);
  return (
    <div className={styles.overlay} onClick={(): void => store.setModal(false)}>
      <div onClick={(e): void => e.stopPropagation()}>{children}</div>
    </div>
  );
}

export default observer(Modal);
