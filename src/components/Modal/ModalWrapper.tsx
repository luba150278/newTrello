/* eslint-disable no-console */
/* eslint-disable react/jsx-no-useless-fragment */

import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { FaTimes } from 'react-icons/fa';
import { ADD_BOARD_TITLE } from '../../common/constans/messages';
import Context from '../../context/Context';
import { ICard } from '../../interfaces/ICard';
import BoardCreate from '../BoardCreate/BoardCreate';
import CardDisplay from '../CardDisplay/CardDisplay';
import Icon from '../Icon/Icon';
import Modal from './Modal';
import styles from './ModalWrapper.module.css';

interface ModalWrapperProps {
  isCard: boolean;
  cardId: string;
}

function ModalWrapper({ isCard, cardId }: ModalWrapperProps): JSX.Element {
  const { store } = useContext(Context);
  if (!store.isModal) {
    return <></>;
  }
  const card: ICard = {
    id: 0,
    title: 'cccccccccc',
    description: 'ddddddddddddd',
    position: 0,
    users: [],
  };
  console.log(cardId);
  const headerTitle = isCard ? 'title' : ADD_BOARD_TITLE;
  const main = (
    <div className={styles.desktopModalContainer}>
      <div className={styles.close}>
        <div onClick={(): void => store.setModal(false)}>
          <Icon
            iconChild={<FaTimes />}
            styles={{
              className: 'icon',
              size: '25',
            }}
            isToolTip={false}
            toolTipText=""
          />
        </div>
      </div>
      <h3 className={styles.header}>{headerTitle}</h3>
      {!isCard ? <BoardCreate /> : <CardDisplay card={card} />}
    </div>
  );

  return <Modal>{main}</Modal>;
}

export default observer(ModalWrapper);
