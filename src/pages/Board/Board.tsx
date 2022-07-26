/* eslint-disable react/jsx-no-bind */

import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import AddList from '../../components/AddList/AddList';
import LinkToMain from '../../components/LinkToMain/Link';
import Lists from '../../components/Lists/Lists';
import Loader from '../../components/Loader/Loader';
import ModalWrapper from '../../components/Modal/BoardModal/ModalWrapper';
import Context from '../../context/Context';
import { GLContextProvider } from '../../context/GetListContext';
import { IList } from '../../interfaces/ILists';
import { withLayout } from '../../layout/Layout';
import BoardTitle from './BoardTitle/BoardTitle';

function Board(): JSX.Element {
  const id = useParams().id || '';
  const { store } = useContext(Context);
  const { boards } = store;
  const [startTitle, setStartTitle] = useState<string>('');
  const [lists, setLists] = useState<IList[]>([]);
  const [pos, setPos] = useState(0);

  useEffect(() => {
    const data = boards.find((item) => item.id === Number(id));
    setStartTitle(data?.title || '');
  }, [boards]);

  async function getLists(): Promise<void> {
    const res = await store.getLists(`${id}`);
    if (res) {
      if (res.lists.length === 0) {
        setPos(1);
      } else {
        const arrLists: IList[] = Object.values(Object.values(res)[2]);
        setLists(arrLists);
        store.setLists(arrLists);
        setPos(arrLists.length);
      }
    }
  }
  useEffect(() => {
    getLists();
  }, [id]);
  if (store.isLoading) {
    return (
      <section>
        <Loader />
      </section>
    );
  }

  return (
    <GLContextProvider value={{ getLists, id, lists }}>
      <section>
        <Container>
          <LinkToMain />
          <BoardTitle startTitle={startTitle} />
          <AddList position={pos} />
          <Lists />
        </Container>
        <ModalWrapper isCard id={id} lists={lists} />
      </section>
    </GLContextProvider>
  );
}
const board = observer(Board);
export default withLayout(board);
