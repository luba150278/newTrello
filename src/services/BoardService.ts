/* eslint-disable no-console */
import { AxiosResponse } from 'axios';
import api from '../api/request';
import config from '../common/constans/api';
import { IBoards } from '../interfaces/Boards';
import { IBoardResponse } from '../interfaces/IBoardResponse';
// import { IBoardResponse } from '../interfaces/IBoardResponse';
import { ILoginResponse } from '../interfaces/ILoginResponse';

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
}
