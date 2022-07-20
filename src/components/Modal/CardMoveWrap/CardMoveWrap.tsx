/* eslint-disable no-console */
/* eslint-disable react/jsx-no-useless-fragment */
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { FaTimes } from 'react-icons/fa';
import Context from '../../../context/Context';
import { ICard } from '../../../interfaces/ICard';
import Icon from '../../Icon/Icon';
import MoveCardBoards from '../../MoveCardBoards/MoveCardBoards';
import Modal from '../Modal';
import styles from './CardMoveWrap.module.css';

interface Props {
  idBoard: string;
  toggleModal: () => void;
  card: ICard;
  idList: number;
}

function CardMoveWrap({ idBoard, toggleModal, card, idList }: Props): JSX.Element {
  const { store } = useContext(Context);
  const { boards } = store;

  const main = (
    <div className={styles.desktopModalContainer}>
      <div className={styles.close}>
        <div onClick={(): void => toggleModal()}>
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
      <p>{idBoard}</p>
      <MoveCardBoards boards={boards} boardID={idBoard} card={card} idList={idList} />
    </div>
  );

  return <Modal toggleModal={toggleModal}>{main}</Modal>;
}

export default observer(CardMoveWrap);
