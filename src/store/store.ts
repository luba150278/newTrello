/* eslint-disable no-console */
import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';
import {
  DANGER_NAME,
  SUCCESS_BOARD_DELETE,
  SUCCESS_BOARD_CREATE,
  SUCCESS_LIST_DELETE,
  SUCCESS_LIST_CREATE,
  EDIT_LIST,
  ADD_CARD,
  SUCCESS_CARD_DELETE,
  EDIT_CARD,
} from '../common/constans/messages';
import getNotify from '../functions/notify';
import setErrorFunction from '../functions/setErrors';
import getSuccessNotify from '../functions/sucessNotify';
import { isValidTitle } from '../functions/validTitles';
import { IBoard } from '../interfaces/IBoard';
import { ICard } from '../interfaces/ICard';
// import { ICard } from '../interfaces/ICard';
import { ICardMove } from '../interfaces/ICardMove';
import { IList, ILists } from '../interfaces/ILists';
import { ILoginResponse } from '../interfaces/ILoginResponse';
import { IInputDefaultData } from '../interfaces/IUserDefaultData';
import BoardService from '../services/BoardService';
import UserService from '../services/UserService';

export default class Store {
  constructor() {
    makeAutoObservable(this);
    this.checkAuth();
    if (this.isAuth) {
      this.getBoards();
      this.setUser();
    }
  }

  // ---Variants--------------
  currentListID = 0;

  currentCardPos = 0;

  isAuth = false;

  isLoading = false;

  error = { status: 200, message: '' };

  boards = [] as IBoard[];

  lists = [] as IList[];

  defaultData = { email: '', password: '' } as IInputDefaultData;

  isModal = false;

  User = localStorage.getItem('name') || '';

  boardTitle = '';

  token = '123';

  card: ICard = { id: 0, position: 0, title: '', description: '', users: [] };

  // ---Setters--------------
  setCard(card: ICard): void {
    this.card = card;
  }

  setCurrentListID(id: number): void {
    this.currentListID = id;
  }

  setCurrentCardPos(id: number): void {
    this.currentCardPos = id;
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

  setError(e: unknown): void {
    const { status, message } = setErrorFunction(e);
    this.error = { status, message };
  }

  setBoards(data: IBoard[]): void {
    this.boards = data;
  }

  setAuth(bool: boolean): void {
    this.isAuth = bool;
  }

  setToken(response: AxiosResponse<ILoginResponse>): void {
    this.token = response.data.token;
    localStorage.setItem('token', response.data.token);
    this.setAuth(true);
  }

  setDefaultData(data: IInputDefaultData): void {
    this.defaultData = data;
  }

  setBoard(title: string): void {
    this.boardTitle = title;
  }

  setLists(lists: IList[]): void {
    this.lists = lists;
  }

  // --------------Functions------------------
  // ------------------------AUTH----------------
  checkAuth(): void {
    if (localStorage.getItem('token')) {
      this.setAuth(true);
      return;
    }
    this.setAuth(false);
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
      // this.getBoards();
    } catch (e) {
      this.setDefaultData({ email, password });
      this.setError(e);
    } finally {
      this.setLoading(false);
    }
  }

  // -----------------BOARDS-------------------
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
      getSuccessNotify(SUCCESS_BOARD_CREATE);
      this.getBoards();
    } catch (e) {
      this.setError(e);
    } finally {
      this.setLoading(false);
    }
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
        getSuccessNotify(SUCCESS_BOARD_DELETE);
      }
      return 'error deleted';
    } catch (e) {
      return this.setError(e);
    } finally {
      this.setLoading(false);
    }
  }

  // -------------------------LIST----------------------------------------
  async deleteList(id: string, idList: string): Promise<string | void> {
    try {
      this.setLoading(true);
      const response = await BoardService.deleteList(id, idList);
      if (response.data.result === 'Deleted') {
        this.getLists(id);
        getSuccessNotify(SUCCESS_LIST_DELETE);
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
      // this.setLists(response.data.lists);
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
        getSuccessNotify(SUCCESS_LIST_CREATE);
      }
    } catch (e) {
      this.setError(e);
    } finally {
      this.setLoading(false);
    }
  }

  async editListTitle(title: string, id: string, position: number, idList: string): Promise<void> {
    this.setLoading(true);
    try {
      const response = await BoardService.editListTitle(title, id, position, idList);
      if (response.data.result === 'Updated') {
        getSuccessNotify(EDIT_LIST);
      }
    } catch (e) {
      this.setError(e);
    } finally {
      this.setLoading(false);
    }
  }

  // ---------------------CARD---------------------

  async addCard(title: string, id: string, idList: number, position: number): Promise<void> {
    try {
      const response = await BoardService.addCard(title, id, position, idList);
      if (response.data.result === 'Created') {
        getSuccessNotify(ADD_CARD);
      }
    } catch (e) {
      this.setError(e);
    } finally {
      this.setLoading(false);
    }
  }

  async deleteCard(id: string, idCard: string, idList: number, lists: IList[]): Promise<void> {
    try {
      const newData: ICardMove[] = [];
      const response = await BoardService.deleteCard(id, idCard);
      if (response.data.result === 'Deleted') {
        getSuccessNotify(SUCCESS_CARD_DELETE);
        // after deleting card - change positions remaining cards
        const { cards } = lists.filter((item) => item.id === idList)[0];
        const cardsArr = Object.values(cards).sort((a: ICard, b: ICard) => (a.position > b.position ? 1 : -1));
        if (cardsArr.length > 0) {
          const cardsFilter = cardsArr.filter((card) => card.id !== Number(idCard));
          let num = 1;
          for (let i = 0; i < cardsFilter.length; i++) {
            newData.push({ id: cardsFilter[i].id, position: num, list_id: idList });
            num++;
          }
          await BoardService.moveCardInOneList(newData, id);
        }
      }
    } catch (e) {
      this.setError(e);
    } finally {
      this.setLoading(false);
    }
  }

  async editCardTitle(title: string, id: string, idList: number, idCard: string, lists: IList[]): Promise<void> {
    try {
      const response = await BoardService.editCardTitle(title, id, idList, idCard);
      if (response.data.result === 'Updated') {
        getSuccessNotify(EDIT_CARD);
        await this.getLists(id);
        const { cards } = lists.filter((item) => item.id === idList)[0];
        const cardsArr = Object.values(cards);
        const card = cardsArr.find((item) => item.id === Number(idCard));
        if (card) {
          card.title = title;
          this.setCard(card);
        }
      }
    } catch (e) {
      this.setError(e);
    } finally {
      this.setLoading(false);
    }
  }

  async moveCardInOneList(
    idMoveCard: number,
    // idCurrentList: number,
    // currentPos: number,
    id: string,
    lists: IList[]
  ): Promise<void> {
    try {
      const idCurrentList = this.currentListID;
      const currentPos = this.currentCardPos;
      const newData: ICardMove[] = [];
      const { cards } = lists.filter((item) => item.id === idCurrentList)[0];
      const cardsArr = Object.values(cards);
      const movePos = cardsArr.find((card) => card.id === idMoveCard)?.position || 0; // movePos !== 0 перемещение внутри списка
      const idListFrom = lists
        .filter((item) => item.id !== idCurrentList)
        .map((list) => {
          const listArr = Object.values(list.cards).filter((card) => card.id === idMoveCard)[0];
          if (listArr) {
            return list.id;
          }
          return 0;
        })[0];

      if (movePos !== 0) {
        if (movePos !== currentPos) {
          for (let i = 0; i < cardsArr.length; i++) {
            if (cardsArr[i].id === idMoveCard) {
              newData.push({ id: cardsArr[i].id, position: currentPos, list_id: idCurrentList });
            } else if (cardsArr[i].position === currentPos) {
              if (Math.abs(currentPos - movePos) === 1) {
                newData.push({
                  id: cardsArr[i].id,
                  position: movePos,
                  list_id: idCurrentList,
                });
              } else {
                newData.push({
                  id: cardsArr[i].id,
                  position: movePos > currentPos ? currentPos + 1 : currentPos - 1,
                  list_id: idCurrentList,
                });
              }
            } else if (Math.abs(currentPos - movePos) !== 1) {
              let pos = cardsArr[i].position;
              if (movePos > currentPos && pos > currentPos && pos < movePos) {
                pos++;
                newData.push({
                  id: cardsArr[i].id,
                  position: pos,
                  list_id: idCurrentList,
                });
              }

              if (movePos < currentPos && pos < currentPos && pos > movePos) {
                pos--;
                newData.push({
                  id: cardsArr[i].id,
                  position: pos,
                  list_id: idCurrentList,
                });
              }
            }
          }
        }
      } else {
        newData.push({ id: idMoveCard, position: currentPos, list_id: idCurrentList });
        for (let i = 0; i < cardsArr.length; i++) {
          if (cardsArr[i].position < currentPos) {
            newData.push({ id: cardsArr[i].id, position: cardsArr[i].position, list_id: idCurrentList });
          } else {
            newData.push({ id: cardsArr[i].id, position: cardsArr[i].position + 1, list_id: idCurrentList });
          }
        }
        // удаляем из перетянутого
        if (idListFrom !== 0) {
          const cardsOnStartList = lists.filter((item) => item.id === idListFrom)[0].cards;
          const cardsAll = Object.values(cardsOnStartList);
          const cardSort = cardsAll.sort((a: ICard, b: ICard) => (a.position > b.position ? 1 : -1));
          let num = 1;
          for (let i = 0; i < cardSort.length; i++) {
            if (cardSort[i].id !== idMoveCard) {
              newData.push({ id: cardSort[i].id, position: num, list_id: idListFrom });
              num++;
            }
          }
        }
      }
      await BoardService.moveCardInOneList(newData, id);
    } catch (e) {
      this.setError(e);
    } finally {
      this.setLoading(false);
    }
  }

  // ---------------------OTHERS------------------
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
}
