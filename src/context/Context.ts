import React from 'react';
import Store from '../store/store';

interface IStore {
  store: Store;
}
export const store = new Store();
const Context = React.createContext<IStore>({
  store,
});
export const ContextProvider = Context.Provider;
export default Context;
