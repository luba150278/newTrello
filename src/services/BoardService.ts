import { AxiosResponse } from 'axios';
import config from '../common/constans/api';
import { IBoards } from '../interfaces/IBoards';
import { IBoardResponse } from '../interfaces/IBoardResponse';
import { ILoginResponse } from '../interfaces/ILoginResponse';
import { ILists } from '../interfaces/ILists';
import $api from '../http';
import { ICardMove } from '../interfaces/ICardMove';

export default class BoardService {
  static async getBoards(): Promise<AxiosResponse<IBoards>> {
    const response = $api.get(config.board);
    return response;
  }

  static async addBoard(title: string): Promise<AxiosResponse<ILoginResponse>> {
    const response = $api.post(config.board, { title });
    return response;
  }

  static async editBoard(title: string, id: string): Promise<void> {
    $api.put(`${config.board}/${id}`, { title });
  }

  static async deleteBoard(id: string): Promise<AxiosResponse<IBoardResponse>> {
    return $api.delete(`${config.board}/${id}`);
  }

  static async getLists(id: string): Promise<AxiosResponse<ILists>> {
    return $api.get(`${config.board}/${id}`);
  }

  static async addList(title: string, id: string, position: number): Promise<AxiosResponse<IBoardResponse>> {
    return $api.post(`${config.board}/${id}/list`, { title, position });
  }

  static async deleteList(id: string, idList: string): Promise<AxiosResponse<IBoardResponse>> {
    return $api.delete(`${config.board}/${id}/list/${idList}`);
  }

  static async editListTitle(
    title: string,
    id: string,
    position: number,
    idList: string
  ): Promise<AxiosResponse<IBoardResponse>> {
    return $api.put(`${config.board}/${id}/list/${idList}`, { title, position });
  }

  static async addCard(
    title: string,
    id: string,
    position: number,
    idList: number
  ): Promise<AxiosResponse<IBoardResponse>> {
    return $api.post(`${config.board}/${id}/card`, { title, list_id: idList, position });
  }

  static async deleteCard(id: string, idCard: string): Promise<AxiosResponse<IBoardResponse>> {
    return $api.delete(`${config.board}/${id}/card/${idCard}`);
  }

  static async editCardTitle(
    title: string,
    id: string,
    idList: number,
    idCard: string
  ): Promise<AxiosResponse<IBoardResponse>> {
    return $api.put(`${config.board}/${id}/card/${idCard}`, { title, list_id: idList });
  }

  static async moveCard(newData: ICardMove[], id: string): Promise<AxiosResponse<IBoardResponse>> {
    return $api.put(`${config.board}/${id}/card`, newData);
  }
}
