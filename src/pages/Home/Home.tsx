import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { NO_BOARDS } from '../../common/constans/messages';
import Context from '../../context/Context';
import { withLayout } from '../../layout/Layout';
import Loader from '../../components/Loader/Loader';
import Boards from './Boards/Boards';
import LoginForm from '../../components/LoginForm/LoginForm';

function Home(): JSX.Element {
  const { store } = useContext(Context);
  const { boards } = store;

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
      <Container>{boards.length > 0 ? <Boards /> : <p>{NO_BOARDS}</p>}</Container>
    </section>
  );
}

export default withLayout(observer(Home));
