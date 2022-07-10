import { observer } from 'mobx-react-lite';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Board from './pages/Board/Board';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<Board />} path="/board/:id" />
        <Route element={<NotFound />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}

export default observer(App);
