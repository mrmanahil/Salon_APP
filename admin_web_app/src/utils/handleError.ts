import { isAxiosError, AxiosError } from "axios";
import { toast } from "react-toastify";

interface ResponseError {
  message: string;
}

function handleError(error: unknown) {
  if (isAxiosError(error)) {
    const e = error as AxiosError<ResponseError>;
    toast.error(e.response?.data.message);
  }
}

export default handleError;
