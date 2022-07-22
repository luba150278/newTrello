import React from 'react';
import { IList } from '../interfaces/ILists';

interface Props {
  id: string;
  getLists: () => Promise<void>;
  lists: IList[];
}
const GetListContext = React.createContext<Props>({
  id: '',
  getLists: async (): Promise<void> => {},
  lists: [],
});
export const GLContextProvider = GetListContext.Provider;
export default GetListContext;
