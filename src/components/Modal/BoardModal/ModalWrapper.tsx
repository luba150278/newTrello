/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-no-useless-fragment */

import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { FaTimes } from 'react-icons/fa';
import { ADD_BOARD_TITLE } from '../../../common/constans/messages';
import { CardDisplayProvider } from '../../../context/CardDisplayContext';
import Context from '../../../context/Context';
import { IconWrapProps } from '../../../interfaces/IconWrapProps';
import { IList } from '../../../interfaces/ILists';
import AddBoard from '../../AddBoard/AddBoard';
import CardDisplay from '../../CardDisplay/CardDisplay';
import IconWrap from '../../IconWrap/IconWrap';
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

  const iconWrapProps: IconWrapProps = {
    onClick: (): void => store.setModal(false),
    iconChild: <FaTimes />,
    iconStyles: {
      className: 'icon',
      size: '20',
    },
    className: 'close',
  };

  const cardDisplay = (): JSX.Element => (
    <CardDisplayProvider value={{ card: store.card, listID: store.currentListID, lists, id }}>
      <CardDisplay />
    </CardDisplayProvider>
  );

  const main = (
    <div className={styles.desktopModalContainer}>
      <IconWrap {...iconWrapProps} />
      {!isCard ? <h3 className={styles.header}>{ADD_BOARD_TITLE}</h3> : null}
      {!isCard ? <AddBoard /> : cardDisplay()}
    </div>
  );

  return <Modal>{main}</Modal>;
}

export default observer(ModalWrapper);
