import { AxiosResponse } from 'axios';
import api from '../api/request';
import config from '../common/constans/api';
import { IBoards } from '../interfaces/Boards';

export default class BoardService {
  static async getBoards(): Promise<AxiosResponse<IBoards>> {
    const response = await api.get(config.board);
    return response;
  }
}
