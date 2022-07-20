/* eslint-disable react/require-default-props */
/* eslint-disable no-console */
/* eslint-disable react/jsx-no-useless-fragment */

import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { FaTimes } from 'react-icons/fa';
import { ADD_BOARD_TITLE } from '../../../common/constans/messages';
import Context from '../../../context/Context';
import { IList } from '../../../interfaces/ILists';
import AddBoard from '../../AddBoard/AddBoard';
import CardDisplay from '../../CardDisplay/CardDisplay';
import Icon from '../../Icon/Icon';
import Modal from '../Modal';
import styles from './ModalWrapper.module.css';

interface ModalWrapperProps {
  isCard: boolean;
  lists?: IList[];
  id?: string;
}

function ModalWrapper({ isCard, lists = [], id = '0' }: ModalWrapperProps): JSX.Element {
  const { store } = useContext(Context);
  if (!store.isModal) {
    return <></>;
  }
  const main = (
    <div className={styles.desktopModalContainer}>
      <div className={styles.close}>
        <div onClick={(): void => store.setModal(false)}>
          <Icon
            iconChild={<FaTimes />}
            styles={{
              className: 'icon',
              size: '20',
            }}
            isToolTip={false}
            toolTipText=""
          />
        </div>
      </div>
      {!isCard ? <h3 className={styles.header}>{ADD_BOARD_TITLE}</h3> : null}
      {!isCard ? <AddBoard /> : <CardDisplay card={store.card} listID={store.currentListID} lists={lists} id={id} />}
    </div>
  );

  return <Modal>{main}</Modal>;
}

export default observer(ModalWrapper);
