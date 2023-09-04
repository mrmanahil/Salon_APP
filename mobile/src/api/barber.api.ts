import {axiosInstance} from './axios';

const getAll = async () => {
  let responseData;
  let errorMessage;
  let isDone = false;

  try {
    const res = await axiosInstance.get('/user/barber');
    responseData = res.data;
    isDone = true;
  } catch (error: any) {
    errorMessage = error.response.data?.message || '';
  } finally {
    return {responseData, isDone, errorMessage};
  }
};

const barberApi = {getAll};

export default barberApi;
