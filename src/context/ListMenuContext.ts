import React from 'react';

const ListMenuContext = React.createContext({
  isVisible: false,
  toggleMenu: () => {},
  sortCards: () => {},
  idList: 0,
  listTitle: '',
  listPosition: 1,
  cardsLength: 0,
  cards: [{ id: 0, title: '', description: '', position: 0, users: [] }],
});
export const ListMenuProvider = ListMenuContext.Provider;
export default ListMenuContext;
