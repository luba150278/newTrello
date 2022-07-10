/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-console */
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import AddListWrapper from '../../components/AddListWrapper/AddListWrapper';
import LinkToMain from '../../components/LinkToMain/Link';
import Lists from '../../components/Lists/Lists';
import Loader from '../../components/Loader/Loader';
import Context from '../../context/Context';
import { IList } from '../../interfaces/ILists';
import { withLayout } from '../../layout/Layout';
import BoardTitle from './BoardTitle/BoardTitle';

function Board(): JSX.Element {
  const id = Number(useParams().id) || 0;
  const { store } = useContext(Context);
  const { boards } = store;
  const [startTitle, setStartTitle] = useState<string>('');
  const [lists, setLists] = useState<IList[]>([]);
  const [pos, setPos] = useState(0);

  useEffect(() => {
    const data = boards.find((item) => item.id === id);
    setStartTitle(data?.title || '');
  }, [boards]);

  async function getList(): Promise<void> {
    const res = await store.getLists(`${id}`);
    if (res) {
      if (res.lists.length === 0) {
        setPos(1);
      } else {
        const arrLists: IList[] = Object.values(Object.values(res)[2]);
        setLists(arrLists);
        setPos(arrLists.length);
      }
    }
  }
  useEffect(() => {
    getList();
  }, [id]);
  if (store.isLoading) {
    return (
      <section>
        <Loader />
      </section>
    );
  }

  return (
    <section>
      <Container>
        <LinkToMain />
        <BoardTitle startTitle={startTitle} id={id} />
        <AddListWrapper id={`${id}`} position={pos} getList={getList} />
        <Lists id={id} lists={lists} getList={getList} />
      </Container>
    </section>
  );
}

export default withLayout(observer(Board));
