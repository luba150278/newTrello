import React from 'react';

const GetListContext = React.createContext({
  id: '',
  getList: () => {},
});
export const GLContextProvider = GetListContext.Provider;
export default GetListContext;
