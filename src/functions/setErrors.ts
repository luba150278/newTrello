/* eslint-disable no-console */
import { AxiosError } from 'axios';
import { ERROR_SERVER } from '../common/constans/messages';
import getErrorMessage from './getErrorMessage';
import getNotify from './notify';

interface IProps {
  status: number;
  message: string;
}

export default function setErrorFunction(e: AxiosError): IProps {
  if (e.response) {
    const data = e.response.data as AxiosError;
    if (data) {
      const message = getErrorMessage(data.message);
      getNotify(data.message);
      return { status: e.response.status, message };
    }
    getNotify(ERROR_SERVER);
    return { status: 500, message: ERROR_SERVER };
  }

  return { status: 500, message: 'Unknown error' };
}
