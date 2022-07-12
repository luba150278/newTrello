import { AxiosResponse } from 'axios';
import config from '../common/constans/api';
import $api from '../http';
import { ILoginResponse } from '../interfaces/ILoginResponse';
import { IUser } from '../interfaces/IUserResponse';

export default class UserService {
  static async registration(email: string, password: string): Promise<AxiosResponse<IUser>> {
    // const response = await instanceLog.post(config.registration, { email, password });
    const response = $api.post(config.registration, { email, password });
    return response;
  }

  static async login(email: string, password: string): Promise<AxiosResponse<ILoginResponse>> {
    // const response = await instanceLog.post(config.login, { email, password });
    const response = $api.post(config.login, { email, password });
    return response;
  }
}
