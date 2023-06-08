const jwt = require("jsonwebtoken");
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

export const newToken = (user: any) => {
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
};