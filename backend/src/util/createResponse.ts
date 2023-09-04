export type SuccessResponse<T> = {
  data: T;
  message: string;
  status: number;
};

function createSuccessResponse<T extends {}>(
  data: T,
  message: string
): SuccessResponse<T> {
  return {
    data,
    message,
    status: 200,
  };
}

export default createSuccessResponse;
