import {axiosInstance} from './axios';

const register = async (data: any) => {
  let responseData;
  let errorMessage;
  let isDone = false;
  try {
    const res = await axiosInstance.post('/user/register', {
      ...data,
      userTypeID: 1,
    });

    responseData = res.data;
    isDone = true;
  } catch (error: any) {
    errorMessage = error.response.data?.message || '';
  } finally {
    return {responseData, isDone, errorMessage};
  }
};

const login = async (data: any) => {
  let responseData;
  let errorMessage;
  let isDone = false;

  try {
    const res = await axiosInstance.post('/user/login', {
      ...data,
      userTypeID: '1',
    });

    responseData = res.data;
    isDone = true;
  } catch (error: any) {
    console.log(error);

    errorMessage = error.response.data?.message || '';
  } finally {
    return {responseData, isDone, errorMessage};
  }
};

const authApi = {register, login};

export default authApi;
