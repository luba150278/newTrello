/* eslint-disable no-console */
/* eslint-disable react/jsx-no-useless-fragment */
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { FaTimes } from 'react-icons/fa';
import CardMoveContext from '../../../context/CardMoveContext';
import { IconWrapProps } from '../../../interfaces/IconWrapProps';
import IconWrap from '../../IconWrap/IconWrap';
import MoveCardBoards from '../../MoveCardBoards/MoveCardBoards';
import Modal from '../Modal';
import styles from './CardMoveWrap.module.css';

function CardMoveWrap(): JSX.Element {
  const { toggleModal } = useContext(CardMoveContext);

  const iconWrapProps: IconWrapProps = {
    onClick: (): void => {
      toggleModal();
    },
    iconChild: <FaTimes />,
    iconStyles: {
      className: 'icon',
      size: '20',
      title: 'Close move card modal',
    },
    className: 'close',
  };
  const main = (
    <div className={styles.desktopModalContainer}>
      <IconWrap {...iconWrapProps} />
      <MoveCardBoards />
    </div>
  );

  return <Modal toggleModal={toggleModal}>{main}</Modal>;
}

export default observer(CardMoveWrap);
