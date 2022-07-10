/* eslint-disable no-console */
import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';
import { DANGER_NAME } from '../common/constans/messages';
import getNotify from '../functions/notify';
import setErrorFunction from '../functions/setErrors';
import getSuccessNotify from '../functions/sucessNotify';
import { isValidTitle } from '../functions/validTitles';
import { IBoard } from '../interfaces/IBoard';
import { ILists } from '../interfaces/ILists';
import { ILoginResponse } from '../interfaces/ILoginResponse';
import { IInputDefaultData } from '../interfaces/IUserDefaultData';
import BoardService from '../services/BoardService';
import UserService from '../services/UserService';

export default class Store {
  isAuth = false;

  isLoading = false;

  error = { status: 200, message: '' };

  boards = [] as IBoard[];

  lists = { users: [], lists: [] } as ILists;

  defaultData = { email: '', password: '' } as IInputDefaultData;

  isModal = false;

  User = localStorage.getItem('name') || '';

  boardTitle = '';

  constructor() {
    makeAutoObservable(this);
    this.checkAuth();
    if (this.isAuth) {
      this.getBoards();
      this.setUser();
    }
  }

  setUser(): void {
    this.User = localStorage.getItem('name') || '';
  }

  setModal(bool: boolean): void {
    this.isModal = bool;
  }

  setLoading(bool: boolean): void {
    this.isLoading = bool;
  }

  setLists(data: ILists): void {
    this.lists = data;
  }

  checkAuth(): void {
    if (localStorage.getItem('token')) {
      this.setAuth(true);
      return;
    }
    this.setAuth(false);
  }

  setError(e: unknown): void {
    const { status, message } = setErrorFunction(e);
    this.error = { status, message };
  }

  setBoards(data: IBoard[]): void {
    this.boards = data;
  }

  async getBoards(): Promise<void> {
    try {
      this.setLoading(true);
      const response = await BoardService.getBoards();
      this.setBoards(response.data.boards);
    } catch (e) {
      this.setError(e);
    } finally {
      this.setLoading(false);
    }
  }

  sortBoards(boards: IBoard[]): void {
    const arr = boards;
    arr.sort((a: IBoard, b: IBoard) => (a.title > b.title ? 1 : -1));
    this.setBoards(arr);
  }

  sortDescBoards(boards: IBoard[]): void {
    const arr = boards;
    arr.sort((a: IBoard, b: IBoard) => (a.title > b.title ? -1 : 1));
    this.setBoards(arr);
  }

  async registration(email: string, password: string): Promise<void> {
    try {
      this.setLoading(true);
      await UserService.registration(email, password);
      this.setLoading(false);
    } catch (e) {
      this.setError(e);
    } finally {
      this.setLoading(false);
    }
  }

  setAuth(bool: boolean): void {
    this.isAuth = bool;
  }

  // setUser(user: IUser): void {
  //   this.user = user;
  // }

  setToken(response: AxiosResponse<ILoginResponse>): void {
    localStorage.setItem('token', response.data.token);
    this.setAuth(true);
  }

  logout(): void {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      this.setAuth(false);
    } catch (e) {
      this.setError(e);
    }
  }

  async login(email: string, password: string): Promise<void> {
    try {
      this.setLoading(true);
      const response = await UserService.login(email, password);
      this.setToken(response);
      this.setDefaultData({ email, password });
      const fi = email.indexOf('@');
      const name = email.slice(0, fi);
      localStorage.setItem('name', name || email);
      this.setUser();
    } catch (e) {
      this.setDefaultData({ email, password });
      this.setError(e);
    } finally {
      this.setLoading(false);
    }
  }

  async addBoard(title: string): Promise<void> {
    try {
      this.setLoading(true);
      const validTitle = isValidTitle(title);
      if (!validTitle) {
        getNotify(DANGER_NAME);
        return;
      }
      await BoardService.addBoard(title);
      this.setModal(false);
      getSuccessNotify('New Board was created');
      this.getBoards();
    } catch (e) {
      this.setError(e);
    } finally {
      this.setLoading(false);
    }
  }

  setDefaultData(data: IInputDefaultData): void {
    this.defaultData = data;
  }

  setBoard(title: string): void {
    this.boardTitle = title;
  }

  async editBoardTitle(title: string, id: string): Promise<void> {
    try {
      this.setLoading(true);
      await BoardService.editBoard(title, id);
      this.setBoard(title);
      this.getBoards();
    } catch (e) {
      this.setError(e);
    } finally {
      this.setLoading(false);
    }
  }

  async deleteBoard(id: string): Promise<string | void> {
    try {
      this.setLoading(true);
      const response = await BoardService.deleteBoard(id);
      if (response.data.result === 'Deleted') {
        this.getBoards();
        getSuccessNotify('Board was deleted!');
      }
      return 'error deleted';
    } catch (e) {
      return this.setError(e);
    } finally {
      this.setLoading(false);
    }
  }

  async deleteList(id: string, idList: string): Promise<string | void> {
    try {
      this.setLoading(true);
      const response = await BoardService.deleteList(id, idList);
      if (response.data.result === 'Deleted') {
        this.getLists(id);
        getSuccessNotify('List was deleted!');
      }
      return 'error deleted';
    } catch (e) {
      return this.setError(e);
    } finally {
      this.setLoading(false);
    }
  }

  async getLists(id: string): Promise<ILists> {
    try {
      this.setLoading(true);
      const response = await BoardService.getLists(id);
      this.setLists(response.data);
      return response.data;
    } catch (e) {
      this.setError(e);
      return { users: [], lists: [] };
    } finally {
      this.setLoading(false);
    }
  }

  async addList(title: string, id: string, position: number): Promise<void> {
    this.setLoading(true);
    try {
      const response = await BoardService.addList(title, id, position);
      if (response.data.result === 'Created') {
        getSuccessNotify('New List was created!');
      }
    } catch (e) {
      this.setError(e);
    } finally {
      this.setLoading(false);
    }
  }
}
