/* eslint-disable no-console */
import { AxiosError, AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';
// import getNotify from '../functions/notify';
import setErrorFunction from '../functions/setErrors';
import { IBoard } from '../interfaces/Board';
import { ILoginResponse } from '../interfaces/ILoginResponse';
import { IInputDefaultData } from '../interfaces/IUserDefaultData';
// import { IBoards } from '../interfaces/Boards';
import BoardService from '../services/BoardService';
import UserService from '../services/UserService';

// import getSuccessNotify from '../functions/sucessNotify';
// import { headersConfig } from '../http/header-config';

export default class Store {
  isAuth = false;

  isLoading = false;

  error = { status: 200, message: '' };

  boards = [] as IBoard[];

  defaultData = { email: '', password: '' } as IInputDefaultData;

  constructor() {
    makeAutoObservable(this);
    if (this.isAuth) {
      this.getBoards();
    }
  }

  setLoading(bool: boolean): void {
    this.isLoading = bool;
  }

  setError(e: AxiosError): void {
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
      this.setLoading(false);
    } catch (e) {
      this.setError(e as AxiosError);
    } finally {
      this.setLoading(false);
    }
  }

  sortBoards(boards: IBoard[]): void {
    const arr = boards;
    arr.sort((a: IBoard, b: IBoard) => {
      if (a.title > b.title) {
        return 1;
      }
      if (a.title < b.title) {
        return -1;
      }
      return 0;
    });
    this.setBoards(arr);
  }

  sortDescBoards(boards: IBoard[]): void {
    const arr = boards;
    arr.sort((a: IBoard, b: IBoard) => {
      if (a.title > b.title) {
        return -1;
      }
      if (a.title < b.title) {
        return 1;
      }
      return 0;
    });
    this.setBoards(arr);
  }

  async registration(email: string, password: string): Promise<void> {
    this.setLoading(true);
    try {
      const response = await UserService.registration(email, password);
      console.log(response);
      this.setLoading(false);
    } catch (e) {
      this.setError(e as AxiosError);
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

  async login(email: string, password: string): Promise<void> {
    try {
      this.setLoading(true);
      const response = await UserService.login(email, password);
      this.setToken(response);
      this.setLoading(false);
    } catch (e) {
      this.setDefaultData({ email, password });
      this.setError(e as AxiosError);
    } finally {
      this.setLoading(false);
    }
  }

  setDefaultData(data: IInputDefaultData): void {
    this.defaultData = data;
  }
}
