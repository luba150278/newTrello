/* eslint-disable no-console */
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import LinkToMain from '../../components/LinkToMain/Link';
import Context from '../../context/Context';
import { withLayout } from '../../layout/Layout';
import BoardTitle from './BoardTitle/BoardTitle';

function Board(): JSX.Element {
  const id = Number(useParams().id) || 0;
  const { store } = useContext(Context);
  const { boards } = store;
  const [startTitle, setStartTitle] = useState<string>('');

  useEffect(() => {
    const data = boards.find((item) => item.id === id);
    setStartTitle(data?.title || '');
  }, [boards]);
  return (
    <section>
      <Container>
        <LinkToMain />
        <BoardTitle startTitle={startTitle} id={id} />
      </Container>
    </section>
  );
}

export default withLayout(observer(Board));
