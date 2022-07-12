import { AxiosError } from 'axios';
import { ERROR_SERVER } from '../common/constans/messages';
import getErrorMessage from './getErrorMessage';
import getNotify from './notify';

interface IProps {
  status: number;
  message: string;
}

export default function setErrorFunction(e: unknown): IProps {
  if (e instanceof AxiosError) {
    if (e.response?.data.error.message) {
      const message = getErrorMessage(e.response?.data.error.message);
      getNotify(message);
      return { status: e.response?.status ? e.response?.status : 500, message };
    }
    getNotify(ERROR_SERVER);
    return { status: 500, message: ERROR_SERVER };
  }
  return { status: 500, message: 'Unknown error' };
}
