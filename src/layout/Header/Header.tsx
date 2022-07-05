import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import Context from '../../context/Context';

function Header(): JSX.Element {
  const { store } = useContext(Context);
  return (
    <header>
      <Container>{store.isAuth ? 'auth' : 'notAuth'}</Container>
    </header>
  );
}

export default observer(Header);
