import {axiosInstance} from './axios';

const get = async (userID: string) => {
  let responseData;
  let errorMessage;
  let isDone = false;

  try {
    const res = await axiosInstance.get('/booking', {params: {userID}});
    responseData = res.data;
    isDone = true;
  } catch (error: any) {
    errorMessage = error.response.data?.message || '';
  } finally {
    return {responseData, isDone, errorMessage};
  }
};

const create = async (data: any) => {
  let responseData;
  let errorMessage;
  let isDone = false;

  try {
    const res = await axiosInstance.post('/booking', data);
    responseData = res.data;
    isDone = true;
  } catch (error: any) {
    errorMessage = error.response.data?.message || '';
  } finally {
    return {responseData, isDone, errorMessage};
  }
};

const bookingApi = {create, get};

export default bookingApi;
