import React from 'react';
import Store from '../store/store';

interface IStore {
  store: Store;
}
const Context = React.createContext<IStore>({
  store: new Store(),
});
export const ContextProvider = Context.Provider;
export default Context;
