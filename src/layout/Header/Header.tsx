import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { Container } from 'react-bootstrap';
import cn from 'classnames';
import Icon from '../../components/Icon/Icon';
import Context from '../../context/Context';
import styles from './Header.module.css';

function Header(): JSX.Element {
  const { store } = useContext(Context);
  return (
    <header className={cn(styles.header, { [styles.hidden]: !store.isAuth })}>
      <Container>
        <div className={styles.headerInner}>
          <p>{store.isAuth ? store.User : 'notAuth'}</p>
          <div className={styles.logoutDiv} onClick={(): void => store.logout()}>
            <Icon
              iconChild={<RiLogoutCircleRLine />}
              styles={{ className: 'logoutIcon icon', size: '20', title: 'logout icon' }}
              isToolTip
              toolTipText="logout"
            />
          </div>
        </div>
      </Container>
    </header>
  );
}

export default observer(Header);
