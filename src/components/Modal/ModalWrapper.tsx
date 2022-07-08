/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-console */
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
  card: ICard;
}

function ModalWrapper({ isCard, card }: ModalWrapperProps): JSX.Element {
  const { store } = useContext(Context);
  if (!store.isModal) {
    return <></>;
  }
  const headerTitle = isCard ? card.title : ADD_BOARD_TITLE;
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
