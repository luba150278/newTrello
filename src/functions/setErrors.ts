import { AxiosError } from 'axios';
import getErrorMessage from './getErrorMessage';
import getNotify from './notify';

interface IProps {
  status: number;
  message: string;
}

export default function setErrorFunction(e: AxiosError): IProps {
  if (e.response) {
    const data = e.response.data as AxiosError;
    const message = getErrorMessage(data.message);
    getNotify(data.message);
    return { status: e.response.status, message };
  }

  return { status: 500, message: 'Unknown error' };
}
