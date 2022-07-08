/* eslint-disable no-console */
import { AxiosResponse } from 'axios';
import api from '../api/request';
import config from '../common/constans/api';
import { ILoginResponse } from '../interfaces/ILoginResponse';
import { IUser } from '../interfaces/IUser';

export default class UserService {
  static async registration(email: string, password: string): Promise<AxiosResponse<IUser>> {
    const response = await api.post(config.registration, { email, password });
    return response;
  }

  static async login(email: string, password: string): Promise<AxiosResponse<ILoginResponse>> {
    console.log(email, password);
    const response = await api.post(config.login, { email, password });
    return response;
  }
}
