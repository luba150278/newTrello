import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { TbPencil } from 'react-icons/tb';
import ListMenuContext from '../../context/ListMenuContext';
import { CardItemProps } from '../../interfaces/CardItemProps';
import { IconWrapProps } from '../../interfaces/IconWrapProps';
import CardMenu from '../CardMenu/CardMenu';
import CardTitle from '../CardTitle/CardTitle';
import IconWrap from '../IconWrap/IconWrap';
import styles from './CardItem.module.css';

function CardItem(props: CardItemProps): JSX.Element {
  const { card, showMenu, openMenu } = props;
  const { idList } = useContext(ListMenuContext);
  const [closeMenu, setCloseMenu] = useState(true);
  const toggleCloseMenu = (): void => {
    setCloseMenu(!closeMenu);
  };

  const iconWrapProps: IconWrapProps = {
    onClick: (): void => {
      toggleCloseMenu();
      openMenu(`${card.id}`, idList);
    },
    iconChild: <TbPencil />,
    iconStyles: {
      className: 'iconPencil',
      size: '20',
      title: 'Card menu',
    },
    className: 'cardMenuIconWrap',
  };
  return (
    <div className={styles.cardWrap}>
      <CardTitle card={card} />
      <IconWrap {...iconWrapProps} />
      {card.description !== '' ? <p>{card.description}</p> : null}
      {showMenu && !closeMenu ? <CardMenu card={card} idList={idList} /> : null}
    </div>
  );
}

export default observer(CardItem);
