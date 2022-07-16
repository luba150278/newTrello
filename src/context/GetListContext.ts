import React from 'react';

const GetListContext = React.createContext({
  id: '',
  getLists: () => {},
});
export const GLContextProvider = GetListContext.Provider;
export default GetListContext;
