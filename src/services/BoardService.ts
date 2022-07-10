/* eslint-disable no-console */
import { AxiosResponse } from 'axios';
import api from '../api/request';
import config from '../common/constans/api';
import { IBoards } from '../interfaces/IBoards';
import { IBoardResponse } from '../interfaces/IBoardResponse';
// import { IBoardResponse } from '../interfaces/IBoardResponse';
import { ILoginResponse } from '../interfaces/ILoginResponse';
import { ILists } from '../interfaces/ILists';

export default class BoardService {
  static async getBoards(): Promise<AxiosResponse<IBoards>> {
    const response = await api.get(config.board);
    return response;
  }

  static async addBoard(title: string): Promise<AxiosResponse<ILoginResponse>> {
    const response = await api.post(config.board, { title });
    return response;
  }

  static async editBoard(title: string, id: string): Promise<void> {
    await api.put(`${config.board}/${id}`, { title });
  }

  static async deleteBoard(id: string): Promise<AxiosResponse<IBoardResponse>> {
    return api.delete(`${config.board}/${id}`);
  }

  static async getLists(id: string): Promise<AxiosResponse<ILists>> {
    return api.get(`${config.board}/${id}`);
  }

  static async addList(title: string, id: string, position: number): Promise<AxiosResponse<IBoardResponse>> {
    return api.post(`${config.board}/${id}/list`, { title, position });
  }

  static async deleteList(id: string, idList: string): Promise<AxiosResponse<IBoardResponse>> {
    return api.delete(`${config.board}/${id}/list/${idList}`);
  }

  static async editListTitle(
    title: string,
    id: string,
    position: number,
    idList: string
  ): Promise<AxiosResponse<IBoardResponse>> {
    return api.put(`${config.board}/${id}/list/${idList}`, { title, position });
  }
}
