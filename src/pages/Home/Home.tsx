import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import Context from '../../context/Context';
import { withLayout } from '../../layout/Layout';
import Loader from '../../components/Loader/Loader';
import Boards from './Boards/Boards';
import LoginForm from '../../components/LoginForm/LoginForm';

function Home(): JSX.Element {
  const { store } = useContext(Context);

  if (store.isLoading) {
    return (
      <section>
        <Loader />
      </section>
    );
  }

  if (!store.isAuth) {
    return <LoginForm />;
  }

  return (
    <section>
      <Container>
        <Boards boards={store.boards} />
      </Container>
    </section>
  );
}

export default withLayout(observer(Home));
