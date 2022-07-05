import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ContextProvider } from './context/Context';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import Store from './store/store';

function App(): JSX.Element {
  const store = new Store();
  return (
    <ContextProvider value={{ store }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<NotFound />} path="*" />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
