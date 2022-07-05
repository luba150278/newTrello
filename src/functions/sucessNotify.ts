import { toast } from 'react-toastify';

const getSuccessNotify = (message: string): React.ReactText =>
  toast.success(message, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

export default getSuccessNotify;
