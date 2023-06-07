export const generateResponse = (
  statusCode: number,
  message: string | undefined,
  data: any
) => {
  return {
    statusCode: statusCode,
    message: message,
    data: data,
  };
};
