/* eslint-disable react/require-default-props */
import { observer } from 'mobx-react-lite';
import React, { ReactNode, useContext } from 'react';
import Context from '../../context/Context';
import styles from './Modal.module.css';

interface ModalProps {
  children: ReactNode;
  toggleModal?: () => void;
}

function Modal({ children, toggleModal = (): void => {} }: ModalProps): JSX.Element {
  const { store } = useContext(Context);
  return (
    <div
      className={styles.overlay}
      onClick={(): void => {
        store.setModal(false);
        if (toggleModal) toggleModal();
      }}
    >
      <div onClick={(e): void => e.stopPropagation()}>{children}</div>
    </div>
  );
}

export default observer(Modal);
