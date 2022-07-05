/* eslint-disable no-console */
import { AxiosError, AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';
// import getNotify from '../functions/notify';
import setErrorFunction from '../functions/setErrors';
import { IBoard } from '../interfaces/Board';
import { IBoards } from '../interfaces/Boards';
import BoardService from '../services/BoardService';

// import getSuccessNotify from '../functions/sucessNotify';
// import { headersConfig } from '../http/header-config';

export default class Store {
  isAuth = true;

  isLoading = false;

  error = { status: 200, message: '' };

  boards = { boards: [] } as IBoards;

  constructor() {
    makeAutoObservable(this);
    if (this.isAuth) {
      this.getBoards(false, 'az');
    }
  }

  setLoading(bool: boolean): void {
    this.isLoading = bool;
  }

  setError(e: AxiosError): void {
    const { status, message } = setErrorFunction(e);
    this.error = { status, message };
  }

  setBoards(response: AxiosResponse<IBoards>): void {
    this.boards = response.data;
  }

  async getBoards(isSort: boolean, abs?: string): Promise<void> {
    try {
      this.setLoading(true);
      const response = await BoardService.getBoards();
      if (!isSort) this.setBoards(response);
      if (abs && abs === 'az') {
        const xxx = response.data.boards;
        xxx.sort((a: IBoard, b: IBoard) => {
          if (a.title > b.title) {
            return 1;
          }
          if (a.title < b.title) {
            return -1;
          }
          // a должно быть равным b
          return 0;
        });
        console.log(xxx);
      }
      this.setLoading(false);
    } catch (e) {
      // this.setDefaultData({ email, password });
      this.setError(e as AxiosError);
    } finally {
      this.setLoading(false);
    }
  }

  sortBoards(): void {
    const xxx = this.boards;
    console.log(xxx);
    // this.boards.boards.sort((a: IBoard, b: IBoard) => {
    //   if (a.title > b.title) {
    //     return 1;
    //   }
    //   if (a.title < b.title) {
    //     return -1;
    //   }
    //   // a должно быть равным b
    //   return 0;
    // });
  }
}
